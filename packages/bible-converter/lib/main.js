"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.toOneJSONFile = exports.splitByChapters = exports.writeBookFolders = exports.writeChapters = void 0;
const fs_1 = require("fs");
const utils_1 = require("./utils");
function isError(error) {
    return error instanceof Error;
}
const writeChapters = (bookPath, bookObj) => __awaiter(void 0, void 0, void 0, function* () {
    let index = 0;
    const chaptersHashes = [];
    for (const chapter of bookObj.chapters) {
        const payload = JSON.stringify(chapter);
        const hash = (0, utils_1.getHash)(payload);
        const chapterKey = (0, utils_1.pad)(index + 1 + "", 3);
        const chapterPath = `${bookPath}/ch${chapterKey}.${hash}.json`;
        chaptersHashes.push(hash);
        try {
            yield fs_1.promises.writeFile(chapterPath, payload);
        }
        catch (err) {
            console.error(`Error writing file ${chapterPath}: `, err);
        }
        index++;
    }
    // Write hashfile for whole book folder
    const bookPayload = JSON.stringify(chaptersHashes);
    const bookHash = (0, utils_1.getHash)(bookPayload);
    const bookHashfilePath = `${bookPath}/hashfile.${bookHash}.json`;
    try {
        yield fs_1.promises.writeFile(bookHashfilePath, bookPayload);
    }
    catch (err) {
        console.error(`Error writing book hashfile for ${bookPath}: `, err);
    }
    return {
        book: bookHash,
        chapters: chaptersHashes
    };
});
exports.writeChapters = writeChapters;
const writeBookFolders = (outputPath, bibleObj, updateProgress) => __awaiter(void 0, void 0, void 0, function* () {
    const booksHashes = {};
    const chaptersHashes = {};
    const bookAliases = Object.keys(bibleObj.books);
    for (let i = 0; i < bookAliases.length; i++) {
        const bookAlias = bookAliases[i];
        const bookPath = `${outputPath}/${bookAlias}`;
        yield fs_1.promises
            .mkdir(bookPath, { recursive: true })
            .then(() => (0, exports.writeChapters)(bookPath, bibleObj.books[bookAlias]))
            .then(({ book, chapters }) => {
            booksHashes[bookAlias] = book;
            chaptersHashes[bookAlias] = chapters;
        })
            .catch((err) => {
            if (err.code === "EEXIST") {
                (0, exports.writeChapters)(bookPath, bibleObj.books[bookAlias]).then(({ book, chapters }) => {
                    booksHashes[bookAlias] = book;
                    chaptersHashes[bookAlias] = chapters;
                });
            }
            console.error("Error creating book folder: ", err);
        });
        if (updateProgress) {
            updateProgress((i + 1) / bookAliases.length, "Writing JSON files of " + bookAlias);
        }
    }
    return {
        booksHashes,
        chaptersHashes
    };
});
exports.writeBookFolders = writeBookFolders;
const splitByChapters = (outputPath, bibleObj, updateProgress) => __awaiter(void 0, void 0, void 0, function* () {
    let hashes;
    let descriptorHash = "";
    try {
        yield fs_1.promises.mkdir(outputPath, { recursive: true });
        hashes = yield (0, exports.writeBookFolders)(outputPath, bibleObj, updateProgress);
    }
    catch (err) {
        if (isError(err) && err instanceof TypeError) {
            if ((err === null || err === void 0 ? void 0 : err.code) === "EEXIST") {
                hashes = yield (0, exports.writeBookFolders)(outputPath, bibleObj, updateProgress);
            }
            else {
                console.error("Error creating book folders: ", err);
            }
        }
    }
    if (hashes) {
        // Write descriptor - the file of all hashes and v11n
        const descriptor = {
            v11n: bibleObj.v11n,
            fragmentNumbers: bibleObj.fragmentNumbers,
            chapters: hashes.chaptersHashes,
            books: hashes.booksHashes
        };
        const descriptorPayload = JSON.stringify(descriptor);
        descriptorHash = (0, utils_1.getHash)(descriptorPayload);
        const descriptorPath = `${outputPath}/descriptor.${descriptorHash}.json`;
        try {
            yield fs_1.promises.writeFile(descriptorPath, descriptorPayload);
        }
        catch (err) {
            console.error(`Error writing book hashfile for ${descriptorPath}: `, err);
        }
    }
    const v11nPayload = JSON.stringify(bibleObj.v11n);
    const v11nHash = (0, utils_1.getHash)(v11nPayload);
    try {
        fs_1.promises.writeFile(`${outputPath}/v11n.${v11nHash}.json`, v11nPayload);
    }
    catch (err) {
        console.error("Error writing v11n file: ", err);
    }
    const fragmentNumbersPayload = JSON.stringify(bibleObj.fragmentNumbers);
    const fragmentNumbersHash = (0, utils_1.getHash)(fragmentNumbersPayload);
    try {
        fs_1.promises.writeFile(`${outputPath}/fragmentNumbers.${fragmentNumbersHash}.json`, fragmentNumbersPayload);
    }
    catch (err) {
        console.error("Error writing fragmentNumbers file: ", err);
    }
    return descriptorHash;
});
exports.splitByChapters = splitByChapters;
const toOneJSONFile = (outputPath, bibleObj) => __awaiter(void 0, void 0, void 0, function* () {
    const all = JSON.stringify(bibleObj);
    const hash = (0, utils_1.getHash)(all);
    try {
        yield fs_1.promises.mkdir(outputPath, { recursive: true });
        yield fs_1.promises.writeFile(`${outputPath}/all.${hash}.json`, all);
    }
    catch (err) {
        console.error("Error writing one complete JSON file: ", err);
    }
});
exports.toOneJSONFile = toOneJSONFile;
const generate = (outputPath, bibleObj, updateProgress) => __awaiter(void 0, void 0, void 0, function* () {
    if (updateProgress) {
        updateProgress(0, "Writing one JSON file");
    }
    yield (0, exports.toOneJSONFile)(outputPath, bibleObj);
    return (0, exports.splitByChapters)(outputPath, bibleObj, updateProgress);
});
exports.generate = generate;
exports.default = {
    generate: exports.generate,
    toOneJSONFile: exports.toOneJSONFile,
    splitByChapters: exports.splitByChapters,
    writeBookFolders: exports.writeBookFolders,
    writeChapters: exports.writeChapters
};
//# sourceMappingURL=main.js.map
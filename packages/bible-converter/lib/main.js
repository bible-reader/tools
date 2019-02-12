"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-promise");
const utils_1 = require("./utils");
exports.writeChapters = (bookPath, bookObj) => __awaiter(this, void 0, void 0, function* () {
    let index = 0;
    const chaptersHashes = [];
    for (const chapter of bookObj.chapters) {
        const payload = JSON.stringify(chapter);
        const hash = utils_1.getHash(payload);
        const chapterKey = utils_1.pad(index + 1 + "", 3);
        const chapterPath = `${bookPath}/ch${chapterKey}.${hash}.json`;
        chaptersHashes.push(hash);
        try {
            yield fs.writeFile(chapterPath, payload);
        }
        catch (err) {
            console.error(`Error writing file ${chapterPath}: `, err);
        }
        index++;
    }
    // Write hashfile for whole book folder
    const bookPayload = JSON.stringify(chaptersHashes);
    const bookHash = utils_1.getHash(bookPayload);
    const bookHashfilePath = `${bookPath}/hashfile.${bookHash}.json`;
    try {
        yield fs.writeFile(bookHashfilePath, bookPayload);
    }
    catch (err) {
        console.error(`Error writing book hashfile for ${bookPath}: `, err);
    }
    return {
        book: bookHash,
        chapters: chaptersHashes
    };
});
exports.writeBookFolders = (outputPath, bibleObj, updateProgress) => __awaiter(this, void 0, void 0, function* () {
    const booksHashes = {};
    const chaptersHashes = {};
    const bookAliases = Object.keys(bibleObj.books);
    for (let i = 0; i < bookAliases.length; i++) {
        const bookAlias = bookAliases[i];
        const bookPath = `${outputPath}/${bookAlias}`;
        yield fs
            .mkdirp(bookPath)
            .then(() => exports.writeChapters(bookPath, bibleObj.books[bookAlias]))
            .then(({ book, chapters }) => {
            booksHashes[bookAlias] = book;
            chaptersHashes[bookAlias] = chapters;
        })
            .catch(err => {
            if (err.code === "EEXIST") {
                exports.writeChapters(bookPath, bibleObj.books[bookAlias]).then(({ book, chapters }) => {
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
    // Write hashfile for whole book folder
    const booksHashesPayload = JSON.stringify(booksHashes);
    const booksHashesHash = utils_1.getHash(booksHashesPayload);
    const booksHashesHashfilePath = `${outputPath}/booksHashes.${booksHashesHash}.json`;
    try {
        yield fs.writeFile(booksHashesHashfilePath, booksHashesPayload);
    }
    catch (err) {
        console.error(`Error writing book hashfile for ${booksHashesHashfilePath}: `, err);
    }
    return {
        booksHashes,
        chaptersHashes
    };
});
exports.splitByChapters = (outputPath, bibleObj, updateProgress) => __awaiter(this, void 0, void 0, function* () {
    let hashes;
    try {
        yield fs.mkdirp(outputPath);
        hashes = yield exports.writeBookFolders(outputPath, bibleObj, updateProgress);
    }
    catch (err) {
        if (err.code === "EEXIST") {
            hashes = exports.writeBookFolders(outputPath, bibleObj, updateProgress);
        }
        else {
            console.error("Error creating book folders: ", err);
        }
    }
    const v11nPayload = JSON.stringify(bibleObj.v11n);
    const v11nHash = utils_1.getHash(v11nPayload);
    try {
        fs.writeFile(`${outputPath}/v11n.${v11nHash}.json`, v11nPayload);
    }
    catch (err) {
        console.error("Error writing v11n file: ", err);
    }
    return hashes;
});
exports.toOneJSONFile = (outputPath, bibleObj) => __awaiter(this, void 0, void 0, function* () {
    const all = JSON.stringify(bibleObj);
    const hash = utils_1.getHash(all);
    try {
        yield fs.mkdirp(outputPath);
        yield fs.writeFile(`${outputPath}/all.${hash}.json`, all);
    }
    catch (err) {
        console.error("Error writing one complete JSON file: ", err);
    }
});
exports.generate = (outputPath, bibleObj, updateProgress) => __awaiter(this, void 0, void 0, function* () {
    if (updateProgress) {
        updateProgress(0, "Writing one JSON file");
    }
    yield exports.toOneJSONFile(outputPath, bibleObj);
    return exports.splitByChapters(outputPath, bibleObj, updateProgress);
});
exports.default = {
    generate: exports.generate,
    toOneJSONFile: exports.toOneJSONFile,
    splitByChapters: exports.splitByChapters,
    writeBookFolders: exports.writeBookFolders,
    writeChapters: exports.writeChapters
};
//# sourceMappingURL=main.js.map
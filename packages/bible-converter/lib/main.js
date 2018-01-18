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
    for (const chapter of bookObj.chapters) {
        const chapterPath = `${bookPath}/ch${utils_1.pad(index + 1 + "", 3)}.json`;
        try {
            yield fs.writeFile(chapterPath, JSON.stringify(chapter));
        }
        catch (err) {
            console.error("Error writing file: ", err);
        }
        index++;
    }
});
exports.writeBookFolders = (outputPath, bibleObj) => __awaiter(this, void 0, void 0, function* () {
    const bookAliases = Object.keys(bibleObj.books);
    for (const bookAlias of bookAliases) {
        const bookPath = `${outputPath}/${bookAlias}`;
        yield fs
            .mkdirp(bookPath)
            .then(() => exports.writeChapters(bookPath, bibleObj.books[bookAlias]))
            .catch(err => {
            if (err.code === "EEXIST") {
                return exports.writeChapters(bookPath, bibleObj.books[bookAlias]);
            }
            console.error("Error creating book folder: ", err);
            return err;
        });
    }
});
exports.splitByChapters = (outputPath, bibleObj) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield fs.mkdirp(outputPath);
        yield exports.writeBookFolders(outputPath, bibleObj);
    }
    catch (err) {
        if (err.code === "EEXIST") {
            return exports.writeBookFolders(outputPath, bibleObj);
        }
        else {
            console.error("Error creating book folder: ", err);
        }
    }
    try {
        fs.writeFile(`${outputPath}/stats.json`, JSON.stringify(bibleObj.stats));
    }
    catch (err) {
        console.error("Error writing stats file: ", err);
    }
});
exports.toOneJSONFile = (outputPath, bibleObj) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield fs.mkdirp(outputPath);
        yield fs.writeFile(`${outputPath}/all.json`, JSON.stringify(bibleObj));
    }
    catch (err) {
        console.error("Error writing one complete JSON file: ", err);
    }
});
exports.generate = (outputPath, bibleObj) => __awaiter(this, void 0, void 0, function* () {
    yield exports.toOneJSONFile(outputPath, bibleObj);
    yield exports.splitByChapters(outputPath, bibleObj);
});
exports.default = {
    generate: exports.generate,
    toOneJSONFile: exports.toOneJSONFile,
    splitByChapters: exports.splitByChapters,
    writeBookFolders: exports.writeBookFolders,
    writeChapters: exports.writeChapters
};
//# sourceMappingURL=main.js.map
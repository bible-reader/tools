"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-promise");
var conf_1 = require("../../conf");
var booksOrder = conf_1.default.booksOrder;
/**
 * param filePath {string} Path to file
 */
var parse = function (filePath) {
    return fs.readFile(filePath, "utf8").then(function (data) {
        var lines = data.toString().split("\n");
        var bibleObj = {
            name: filePath,
            books: {},
            stats: {}
        };
        lines.forEach(function (line) {
            var normalLine = line.trim();
            if (normalLine.length > 0 && normalLine[0] !== "#") {
                var lineParts = normalLine.split("\t");
                var bookNumber = parseInt(lineParts[0], 10);
                var chapterNumber = parseInt(lineParts[1], 10);
                var verseNumber = parseInt(lineParts[2], 10);
                var verseText = lineParts[3];
                // create book object if it does not exist
                if (bibleObj.books[booksOrder[bookNumber - 1]] === undefined) {
                    bibleObj.books[booksOrder[bookNumber - 1]] = {
                        chapters: []
                    };
                }
                var book = bibleObj.books[booksOrder[bookNumber - 1]];
                // create chapter object if it does not exist
                if (book.chapters[chapterNumber - 1] === undefined) {
                    book.chapters[chapterNumber - 1] = {
                        verses: []
                    };
                }
                var chapter = book.chapters[chapterNumber - 1];
                chapter.verses[verseNumber - 1] = verseText;
            }
        });
        return bibleObj;
    });
};
exports.default = parse;
//# sourceMappingURL=index.js.map
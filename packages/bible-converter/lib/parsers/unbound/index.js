"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = require("../../conf");
var booksOrder = conf_1.default.booksOrder;
/**
 * param filePath {string} Path to file
 */
var parse = function (data, name) {
    var lines = data.toString().split("\n");
    var bibleObj = {
        name: name,
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
            // create book object if it does not exist (in stats, too)
            if (bibleObj.books[booksOrder[bookNumber - 1]] === undefined) {
                bibleObj.books[booksOrder[bookNumber - 1]] = {
                    chapters: []
                };
                bibleObj.stats[booksOrder[bookNumber - 1]] = [];
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
    // Stats: number of verses for each chapter
    Object.keys(bibleObj.stats).forEach(function (bookSlug) {
        bibleObj.stats[bookSlug] = bibleObj.books[bookSlug].chapters.map(function (chapter) { return chapter.verses.length; });
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
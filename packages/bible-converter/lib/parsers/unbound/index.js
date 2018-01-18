"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@scripture-app/common");
var booksOrder = common_1.organization.booksOrder;
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
    // Indexes of tab-separated columns initialized
    var bookIndex = -1;
    var chapterIndex = -1;
    var verseIndex = -1;
    var textIndex = -1;
    lines.forEach(function (line) {
        var normalLine = line.trim();
        if (normalLine.length > 0 && normalLine.indexOf("#columns") === 0) {
            var lineParts = normalLine.split("\t");
            lineParts.forEach(function (part, index) {
                switch (part) {
                    case "orig_book_index":
                        bookIndex = index - 1;
                        return;
                    case "orig_chapter":
                        chapterIndex = index - 1;
                        return;
                    case "orig_verse":
                        verseIndex = index - 1;
                        return;
                    case "text":
                        textIndex = index - 1;
                    default:
                        return;
                }
            });
        }
        if (normalLine.length > 0 && normalLine[0] !== "#") {
            if (bookIndex === -1) {
                throw new Error("No line starting with #columns was encountered in this file.");
            }
            var lineParts = normalLine.split("\t");
            var bookNumber = parseInt(lineParts[bookIndex], 10);
            var chapterNumber = parseInt(lineParts[chapterIndex], 10);
            var verseNumber = parseInt(lineParts[verseIndex], 10);
            var verseText = lineParts[textIndex];
            // For now, there is no support for apocryphas
            if (bookNumber <= 66) {
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
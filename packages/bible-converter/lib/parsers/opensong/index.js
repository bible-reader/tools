"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseFromXML = require("xml-parser");
var common_1 = require("@scripture-app/common");
var booksOrder = common_1.config.booksOrder;
/**
 * param filePath {string} Path to file
 */
var parse = function (data, name) {
    var parsedXml = parseFromXML(data.toString());
    var books = parsedXml.root.children;
    var bibleObj = {
        name: name,
        books: {},
        stats: {}
    };
    books.forEach(function (book, index) {
        bibleObj.books[booksOrder[index]] = {
            chapters: []
        };
        bibleObj.books[booksOrder[index]].chapters = book.children.map(function (chapter) { return ({
            verses: chapter.children.map(function (verse) { return verse.content || ""; })
        }); });
        // Stats: number of verses for each chapter
        bibleObj.stats[booksOrder[index]] = book.children.map(function (chapter) { return chapter.children.length; });
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
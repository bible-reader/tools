"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-promise");
var parseFromXML = require("xml-parser");
var conf_1 = require("../../conf");
var booksOrder = conf_1.default.booksOrder;
/**
 * param filePath {string} Path to file
 */
var parse = function (filePath) {
    return fs.readFile(filePath, "utf8").then(function (data) {
        var parsedXml = parseFromXML(data.toString());
        var books = parsedXml.root.children;
        var bibleObj = {
            name: filePath,
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
    });
};
exports.default = parse;
//# sourceMappingURL=index.js.map
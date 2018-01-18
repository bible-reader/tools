"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFromXML = require("xml-parser");
const common_1 = require("@scripture-app/common");
const { booksOrder } = common_1.organization;
/**
 * param filePath {string} Path to file
 */
const parse = (data, name) => {
    const parsedXml = parseFromXML(data.toString());
    const books = parsedXml.root.children;
    const bibleObj = {
        name,
        books: {},
        stats: {}
    };
    books.forEach((book, index) => {
        bibleObj.books[booksOrder[index]] = {
            chapters: []
        };
        bibleObj.books[booksOrder[index]].chapters = book.children.map(chapter => ({
            verses: chapter.children.map(verse => verse.content || "")
        }));
        // Stats: number of verses for each chapter
        bibleObj.stats[booksOrder[index]] = book.children.map(chapter => chapter.children.length);
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
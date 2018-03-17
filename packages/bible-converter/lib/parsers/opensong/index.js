"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFromXML = require("xml-parser");
const common_1 = require("@scripture-app/common");
/**
 * param filePath {string} Path to file
 */
const parse = (data, id, name, lang) => {
    const parsedXml = parseFromXML(data.toString());
    const books = parsedXml.root.children;
    const bibleObj = {
        id,
        name,
        lang,
        books: {},
        v11n: {}
    };
    books.forEach((book, index) => {
        bibleObj.books[common_1.booksOrder[index]] = {
            chapters: []
        };
        bibleObj.books[common_1.booksOrder[index]].chapters = book.children.map(chapter => ({
            verses: chapter.children.map(verse => verse.content || "")
        }));
        // V11n (versification): number of verses for each chapter
        bibleObj.v11n[common_1.booksOrder[index]] = book.children.map(chapter => chapter.children.length);
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
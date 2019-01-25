"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFromXML = require("xml-parser");
const common_1 = require("@bible-reader/common");
const isBook = (book) => book.name === "b";
const isChapter = (chapter) => chapter.name === "c";
const isVerse = (verse) => verse.name === "v";
/**
 * param filePath {string} Path to file
 */
const parse = (data, id, name, lang, updateProgress) => {
    const parsedXml = parseFromXML(data.toString());
    const books = parsedXml.root.children;
    const bibleObj = {
        id,
        name,
        lang,
        books: {},
        v11n: {}
    };
    books.filter(isBook).forEach((book, index) => {
        bibleObj.books[common_1.booksOrder[index]] = {
            chapters: []
        };
        bibleObj.books[common_1.booksOrder[index]].chapters = book.children
            .filter(isChapter)
            .map(chapter => ({
            verses: chapter.children
                .filter(isVerse)
                .map(verse => verse.content || "")
        }));
        // V11n (versification): number of verses for each chapter
        bibleObj.v11n[common_1.booksOrder[index]] = book.children
            .filter(isChapter)
            .map(chapter => chapter.children.filter(isVerse).length);
        if (updateProgress) {
            // progress is current book index / number of all books (66)
            updateProgress((index + 1) / common_1.booksOrder.length, common_1.booksOrder[index]);
        }
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
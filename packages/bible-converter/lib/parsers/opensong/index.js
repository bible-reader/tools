"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFromXML = require("xml-parser");
const common_1 = require("@bible-reader/common");
const NUM_BOOKS_OT = 39;
const NUM_BOOKS_NT = 27;
const isBook = (otBooks, ntBooks, book) => book.name === "b" &&
    (otBooks[book.attributes.n] !== undefined ||
        ntBooks[book.attributes.n] !== undefined);
const isChapter = (chapter) => chapter.name === "c";
const isVerse = (verse) => verse.name === "v";
/**
 * param filePath {string} Path to file
 */
const parse = (data, id, name, lang, updateProgress) => {
    const parsedXml = parseFromXML(data.toString());
    const children = parsedXml.root.children;
    const bibleObj = {
        id,
        name,
        lang,
        books: {},
        v11n: {}
    };
    let otIndex = 0;
    let ntIndex = 0;
    const otBooks = {};
    const ntBooks = {};
    children.forEach(child => {
        if (child.name === "OT") {
            child.children.forEach(item => {
                if (otIndex < NUM_BOOKS_OT) {
                    otBooks[item.attributes.n] = otIndex;
                    otIndex++;
                }
            });
        }
        if (child.name === "NT") {
            child.children.forEach(item => {
                if (ntIndex < NUM_BOOKS_NT) {
                    ntBooks[item.attributes.n] = ntIndex;
                    ntIndex++;
                }
            });
        }
    });
    const isInBookList = (book) => isBook(otBooks, ntBooks, book);
    const books = children.filter(isInBookList);
    books.forEach((book, index) => {
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFromXML = require("xml-parser");
const common_1 = require("@bible-reader/common");
const defaultBookLists_1 = require("./defaultBookLists");
const NUM_BOOKS_OT = 39;
const NUM_BOOKS_NT = 27;
exports.isBook = (otBooks, ntBooks, book) => book.name === "b" &&
    otBooks &&
    ntBooks &&
    (otBooks[book.attributes.n] !== undefined ||
        ntBooks[book.attributes.n] !== undefined);
exports.isChapter = (chapter) => chapter.name === "c";
exports.isVerse = (verse) => verse.name === "v";
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
    let otBooks;
    let ntBooks;
    children.forEach(child => {
        if (child.name === "OT") {
            otBooks = {};
            child.children.forEach(item => {
                if (otIndex < NUM_BOOKS_OT && otBooks) {
                    otBooks[item.attributes.n] = otIndex;
                    otIndex++;
                }
            });
        }
        if (child.name === "NT") {
            ntBooks = {};
            child.children.forEach(item => {
                if (ntIndex < NUM_BOOKS_NT && ntBooks) {
                    ntBooks[item.attributes.n] = ntIndex;
                    ntIndex++;
                }
            });
        }
    });
    if (otBooks === undefined) {
        otBooks = defaultBookLists_1.defaultOTBooks;
    }
    if (ntBooks === undefined) {
        ntBooks = defaultBookLists_1.defaultNTBooks;
    }
    const isInBookList = (book) => exports.isBook(otBooks, ntBooks, book);
    const books = children.filter(isInBookList);
    books.forEach((book, index) => {
        bibleObj.books[common_1.booksOrder[index]] = {
            chapters: []
        };
        bibleObj.books[common_1.booksOrder[index]].chapters = book.children
            .filter(exports.isChapter)
            .map(chapter => ({
            verses: chapter.children
                .filter(exports.isVerse)
                .map(verse => verse.content || "")
        }));
        // V11n (versification): number of verses for each chapter
        bibleObj.v11n[common_1.booksOrder[index]] = book.children
            .filter(exports.isChapter)
            .map(chapter => chapter.children.filter(exports.isVerse).length);
        if (updateProgress) {
            // progress is current book index / number of all books (66)
            updateProgress((index + 1) / common_1.booksOrder.length, common_1.booksOrder[index]);
        }
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
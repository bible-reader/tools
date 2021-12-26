"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerse = exports.isChapter = exports.isBook = void 0;
const parseFromXML = require("xml-parser");
const common_1 = require("@bible-reader/common");
const defaultBookLists_1 = require("./defaultBookLists");
const NUM_BOOKS_OT = 39;
const NUM_BOOKS_NT = 27;
const isBook = (otBooks, ntBooks, book) => book.name === "b" &&
    otBooks &&
    ntBooks &&
    (otBooks[book.attributes.n] !== undefined ||
        ntBooks[book.attributes.n] !== undefined);
exports.isBook = isBook;
const isChapter = (chapter) => chapter.name === "c";
exports.isChapter = isChapter;
const isVerse = (verse) => verse.name === "v";
exports.isVerse = isVerse;
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
        v11n: {},
        fragmentNumbers: {}
    };
    let otIndex = 0;
    let ntIndex = 0;
    let otBooks;
    let ntBooks;
    children.forEach((child) => {
        if (child.name === "OT") {
            otBooks = {};
            child.children.forEach((item) => {
                if (otIndex < NUM_BOOKS_OT && otBooks) {
                    otBooks[item.attributes.n] = otIndex;
                    otIndex++;
                }
            });
        }
        if (child.name === "NT") {
            ntBooks = {};
            child.children.forEach((item) => {
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
    const isInBookList = (book) => (0, exports.isBook)(otBooks, ntBooks, book);
    const books = children.filter(isInBookList);
    books.forEach((book, index) => {
        const bookID = common_1.booksOrder[index];
        bibleObj.books[bookID] = {
            chapters: []
        };
        bibleObj.books[bookID].chapters = book.children
            .filter(exports.isChapter)
            .map((chapter) => ({
            fragments: chapter.children
                .filter(exports.isVerse)
                .map((verse, index) => ({ v: index + 1, t: verse.content || "" }))
        }));
        // V11n (versification): number of verses for each chapter
        bibleObj.v11n[bookID] = book.children
            .filter(exports.isChapter)
            .map((chapter) => chapter.children.filter(exports.isVerse).length);
        // Fragments - number of verses (or fragments of verses) up to the current chapter
        bibleObj.fragmentNumbers[bookID] = bibleObj.v11n[bookID].reduce((previous, current, currentIndex) => [
            ...previous,
            currentIndex === 0 ? current : current + previous[currentIndex - 1]
        ], []);
        if (updateProgress) {
            // progress is current book index / number of all books (66)
            updateProgress((index + 1) / common_1.booksOrder.length, bookID);
        }
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
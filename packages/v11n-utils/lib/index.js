"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextChapter = exports.getPreviousChapter = exports.verseExists = exports.chapterExists = void 0;
function chapterExists(v11n, book, chapter) {
    return v11n[book] ? (v11n[book][chapter - 1] ? true : false) : false;
}
exports.chapterExists = chapterExists;
function verseExists(v11n, book, chapter, verse) {
    return verse > 0 && verse <= v11n[book][chapter - 1];
}
exports.verseExists = verseExists;
function getPreviousChapter(v11n, { book, chapter }) {
    if (!chapterExists(v11n, book, chapter)) {
        return null;
    }
    const booksArray = Object.keys(v11n);
    const bookIndex = booksArray.indexOf(book);
    let nextBook;
    let nextChapter;
    if (chapter > 1) {
        nextBook = book;
        nextChapter = chapter - 1;
    }
    else {
        nextBook = booksArray[bookIndex - 1];
        if (nextBook === undefined) {
            return null;
        }
        nextChapter = v11n[nextBook].length;
    }
    return {
        book: nextBook,
        chapter: nextChapter
    };
}
exports.getPreviousChapter = getPreviousChapter;
function getNextChapter(v11n, { book, chapter }) {
    if (!chapterExists(v11n, book, chapter)) {
        return null;
    }
    const currentBookNumChapters = v11n[book].length;
    const booksArray = Object.keys(v11n);
    const bookIndex = booksArray.indexOf(book);
    let nextBook;
    let nextChapter;
    if (chapter < currentBookNumChapters) {
        nextBook = book;
        nextChapter = chapter + 1;
    }
    else {
        nextBook = booksArray[bookIndex + 1];
        nextChapter = 1;
    }
    if (nextBook === undefined) {
        return null;
    }
    return {
        book: nextBook,
        chapter: nextChapter
    };
}
exports.getNextChapter = getNextChapter;
//# sourceMappingURL=index.js.map
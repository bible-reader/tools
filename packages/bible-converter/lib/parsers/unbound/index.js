"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@bible-reader/common");
/**
 * param filePath {string} Path to file
 */
const parse = (data, id, name, lang, updateProgress) => {
    const lines = data.toString().split("\n");
    const bibleObj = {
        id,
        name,
        lang,
        books: {},
        v11n: {},
        fragmentNumbers: {}
    };
    // Indexes of tab-separated columns initialized
    let bookIndex = -1;
    let chapterIndex = -1;
    let verseIndex = -1;
    let textIndex = -1;
    lines.forEach((line) => {
        const normalLine = line.trim();
        if (normalLine.length > 0 && normalLine.indexOf("#columns") === 0) {
            const lineParts = normalLine.split("\t");
            lineParts.forEach((part, index) => {
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
                        return;
                    default:
                        return;
                }
            });
        }
        if (normalLine.length > 0 && normalLine[0] !== "#") {
            if (bookIndex === -1) {
                throw new Error("No line starting with #columns was encountered in this file.");
            }
            const lineParts = normalLine.split("\t");
            const bookNumber = parseInt(lineParts[bookIndex], 10);
            const chapterNumber = parseInt(lineParts[chapterIndex], 10);
            const verseNumber = parseInt(lineParts[verseIndex], 10);
            const verseText = lineParts[textIndex];
            // For now, there is no support for apocryphas
            if (bookNumber <= 66) {
                // create book object if it does not exist (in v11n, too)
                if (bibleObj.books[common_1.booksOrder[bookNumber - 1]] === undefined) {
                    bibleObj.books[common_1.booksOrder[bookNumber - 1]] = {
                        chapters: []
                    };
                    bibleObj.v11n[common_1.booksOrder[bookNumber - 1]] = [];
                    bibleObj.fragmentNumbers[common_1.booksOrder[bookNumber - 1]] = [];
                    if (updateProgress) {
                        updateProgress(bookNumber / 66, common_1.booksOrder[bookNumber - 1]);
                    }
                }
                const book = bibleObj.books[common_1.booksOrder[bookNumber - 1]];
                // create chapter object if it does not exist
                if (book.chapters[chapterNumber - 1] === undefined) {
                    book.chapters[chapterNumber - 1] = {
                        fragments: []
                    };
                }
                const chapter = book.chapters[chapterNumber - 1];
                chapter.fragments[verseNumber - 1] = { t: verseText, v: verseNumber };
            }
        }
    });
    Object.keys(bibleObj.v11n).forEach((bookSlug) => {
        // V11n (versification): number of verses for each chapter
        bibleObj.v11n[bookSlug] = bibleObj.books[bookSlug].chapters.map((chapter) => chapter.fragments.length);
        // Fragments - number of verses (or fragments of verses) up to the current chapter
        bibleObj.fragmentNumbers[bookSlug] = bibleObj.v11n[bookSlug].reduce((previous, current, currentIndex) => [
            ...previous,
            currentIndex === 0 ? current : current + previous[currentIndex - 1]
        ], []);
    });
    return bibleObj;
};
exports.default = parse;
//# sourceMappingURL=index.js.map
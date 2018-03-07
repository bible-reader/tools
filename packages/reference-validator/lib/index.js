"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chapterExists(v11n, book, chapter) {
    return v11n[book] ? (v11n[book][chapter - 1] ? true : false) : false;
}
exports.chapterExists = chapterExists;
function verseExists(v11n, book, chapter, verse) {
    return verse > 0 && verse <= v11n[book][chapter - 1];
}
exports.verseExists = verseExists;
//# sourceMappingURL=index.js.map
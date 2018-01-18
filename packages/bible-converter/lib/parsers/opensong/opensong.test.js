"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-promise");
const _1 = require(".");
describe("OpenSong Bible format parser", () => {
    it("should read file and parse it into object", done => {
        const testFilePath = "src/parsers/opensong/KJV_test_sample.xmm";
        const name = testFilePath;
        fs
            .readFile(testFilePath, "utf8")
            .then(data => _1.default(data, name))
            .then((bibleObj) => {
            expect(bibleObj.name).toEqual(testFilePath);
            const books = bibleObj.books;
            expect(Object.keys(books).length).toEqual(5);
            expect(books.gen.chapters[0].verses[0]).toEqual("In the beginning God created the heaven and the earth.");
            expect(books.exo.chapters[19].verses[2]).toEqual("Thou shalt have no other gods before me.");
            // Number of chapters in genesis
            expect(bibleObj.stats.gen.length).toEqual(50);
            // Number of verses in Gen. 1
            expect(bibleObj.stats.gen[0]).toEqual(31);
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
});
//# sourceMappingURL=opensong.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-promise");
const _1 = require(".");
describe("Unbound Bible format parser", () => {
    it("should read file and parse it into object", done => {
        const testFilePath = "src/parsers/unbound/czech_bkr_utf8_sample.txt";
        const name = testFilePath;
        fs
            .readFile(testFilePath, "utf8")
            .then(data => _1.default(data, name))
            .then((bibleObj) => {
            expect(bibleObj.name).toEqual(testFilePath);
            const books = bibleObj.books;
            // expect(Object.keys(books).length).toEqual(5);
            expect(books.gen.chapters[0].verses[0]).toEqual("Na počátku stvořil Bůh nebe a zemi.");
            expect(books.exo.chapters[19].verses[2]).toEqual("Nebudeš míti bohů jiných přede mnou.");
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
//# sourceMappingURL=unbound.test.js.map
import { expect } from "chai";

import parse from ".";

import { IBibleObject } from "../../types";

describe("OpenSong parser", () => {
  it("should read file and parse it into object", done => {
    const testFilePath = "src/parsers/opensong/KJV_test_sample.xmm";

    parse(testFilePath)
      .then((bibleObj: IBibleObject) => {
        expect(bibleObj.name).to.equal(testFilePath);

        const books = bibleObj.books;
        expect(Object.keys(books).length).to.equal(5);

        expect(books.gen.name).to.equal("Genesis");
        expect(books.exo.name).to.equal("Exodus");
        expect(books.lev.name).to.equal("Leviticus");
        expect(books.num.name).to.equal("Numbers");
        expect(books.deu.name).to.equal("Deuteronomy");

        // Verse element name
        expect(books.exo.chapters[19].verses[2]).to.equal(
          "Thou shalt have no other gods before me."
        );
        done();
      })
      .catch((err: Error) => {
        console.error(err);
        done();
      });
  });
});

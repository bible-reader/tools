import { expect } from "chai";

import parse from ".";

import { IBibleObject } from "../../types";

describe("Unbound Bible format parser", () => {
  it("should read file and parse it into object", done => {
    const testFilePath = "src/parsers/unbound/czech_bkr_utf8_sample.txt";

    parse(testFilePath)
      .then((bibleObj: IBibleObject) => {
        expect(bibleObj.name).to.equal(testFilePath);

        const books = bibleObj.books;
        // expect(Object.keys(books).length).to.equal(5);

        expect(books.gen.chapters[0].verses[0]).to.equal(
          "Na počátku stvořil Bůh nebe a zemi."
        );

        expect(books.exo.chapters[19].verses[2]).to.equal(
          "Nebudeš míti bohů jiných přede mnou."
        );

        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});

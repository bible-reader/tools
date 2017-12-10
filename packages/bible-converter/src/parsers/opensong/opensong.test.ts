import { expect } from "chai";
import * as fs from "fs-promise";

import parse from ".";

import { IBibleObject } from "../../types";

describe("OpenSong Bible format parser", () => {
  it("should read file and parse it into object", done => {
    const testFilePath = "src/parsers/opensong/KJV_test_sample.xmm";
    const name = testFilePath;

    fs
      .readFile(testFilePath, "utf8")
      .then(data => parse(data, name))
      .then((bibleObj: IBibleObject) => {
        expect(bibleObj.name).to.equal(testFilePath);

        const books = bibleObj.books;
        expect(Object.keys(books).length).to.equal(5);

        expect(books.gen.chapters[0].verses[0]).to.equal(
          "In the beginning God created the heaven and the earth."
        );

        expect(books.exo.chapters[19].verses[2]).to.equal(
          "Thou shalt have no other gods before me."
        );

        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});

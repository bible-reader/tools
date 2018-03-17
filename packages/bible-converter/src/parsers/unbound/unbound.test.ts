import * as path from "path";
import * as fs from "fs-promise";

import parse from ".";

import { BibleVersion } from "@scripture-app/types";

describe("Unbound Bible format parser", () => {
  it("should read file and parse it into object", done => {
    const testFilePath = path.join(__dirname, "czech_bkr_utf8_sample.txt");
    const name = testFilePath;

    fs
      .readFile(testFilePath, "utf8")
      .then(data => parse(data, "bkr", name, "cz"))
      .then((bibleObj: BibleVersion) => {
        expect(bibleObj.name).toEqual(testFilePath);

        const books = bibleObj.books;
        // expect(Object.keys(books).length).toEqual(5);

        expect(books.gen.chapters[0].verses[0]).toEqual(
          "Na počátku stvořil Bůh nebe a zemi."
        );

        expect(books.exo.chapters[19].verses[2]).toEqual(
          "Nebudeš míti bohů jiných přede mnou."
        );

        // Number of chapters in genesis
        expect(bibleObj.v11n.gen.length).toEqual(50);

        // Number of verses in Gen. 1
        expect(bibleObj.v11n.gen[0]).toEqual(31);

        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});

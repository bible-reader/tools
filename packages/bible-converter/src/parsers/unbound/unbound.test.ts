import * as path from "path";
import { promises as fs } from "fs";

import parse from ".";

import { BibleVersionContent } from "@bible-reader/types";

describe("Unbound Bible format parser", () => {
  it("should read file and parse it into object", (done) => {
    const testFilePath = path.join(__dirname, "czech_bkr_utf8_sample.txt");
    const name = "czech_bkr_utf8_sample";

    fs.readFile(testFilePath, "utf8")
      .then((data) => parse(data, "bkr", name, "cz"))
      .then((bibleObj: BibleVersionContent) => {
        expect(bibleObj).toMatchSnapshot();

        expect(bibleObj.name).toEqual(name);

        const books = bibleObj.books;
        // expect(Object.keys(books).length).toEqual(5);

        expect(books.gen.chapters[0].fragments[0].t).toEqual(
          "Na počátku stvořil Bůh nebe a zemi."
        );

        expect(books.gen.chapters[0].fragments[0].v).toEqual(1);

        expect(books.exo.chapters[19].fragments[2].t).toEqual(
          "Nebudeš míti bohů jiných přede mnou."
        );

        expect(books.exo.chapters[19].fragments[2].v).toEqual(3);

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

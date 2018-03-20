import * as path from "path";
import * as fs from "fs-promise";

import parse from ".";

import { BibleVersionContent } from "@scripture-app/types";

describe("OpenSong Bible format parser", () => {
  it("should read file and parse it into object", done => {
    const testFilePath = path.join(__dirname, "KJV_test_sample.xmm");
    const name = testFilePath;

    fs
      .readFile(testFilePath, "utf8")
      .then(data => parse(data, "kjv", name, "en"))
      .then((bibleObj: BibleVersionContent) => {
        expect(bibleObj.name).toEqual(testFilePath);

        const books = bibleObj.books;
        expect(Object.keys(books).length).toEqual(5);

        expect(books.gen.chapters[0].verses[0]).toEqual(
          "In the beginning God created the heaven and the earth."
        );

        expect(books.exo.chapters[19].verses[2]).toEqual(
          "Thou shalt have no other gods before me."
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

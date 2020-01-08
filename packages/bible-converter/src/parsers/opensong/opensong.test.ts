import * as path from "path";
import { promises as fs } from "fs";

import { BibleVersionContent } from "@bible-reader/types";

import parse, { isBook } from ".";
import { defaultNTBooks, defaultOTBooks } from "./defaultBookLists";

describe("OpenSong Bible format parser", () => {
  it("should read file and parse it into object", done => {
    const testFilePath = path.join(__dirname, "KJV_test_sample.xmm");
    const name = "KJV_test_sample";

    fs.readFile(testFilePath, "utf8")
      .then(data => parse(data, "kjv", name, "en"))
      .then((bibleObj: BibleVersionContent) => {
        expect(bibleObj.name).toEqual(name);

        const books = bibleObj.books;

        expect(bibleObj).toMatchSnapshot();

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

  it("does not accept book if not <b> element", () => {
    expect(
      isBook(defaultOTBooks, defaultNTBooks, {
        attributes: { n: "nothing" },
        name: "x",
        children: []
      })
    ).toBe(false);
    expect(
      isBook(defaultOTBooks, defaultNTBooks, {
        attributes: { n: "Genesis" },
        name: "x",
        children: []
      })
    ).toBe(false);
  });

  it("can use default book lists", () => {
    expect(
      isBook(defaultOTBooks, defaultNTBooks, {
        attributes: { n: "nothing" },
        name: "b",
        children: []
      })
    ).toBe(false);
    expect(
      isBook(defaultOTBooks, defaultNTBooks, {
        attributes: { n: "Genesis" },
        name: "b",
        children: []
      })
    ).toBe(true);
    expect(
      isBook(defaultOTBooks, defaultNTBooks, {
        attributes: { n: "Philippians" },
        name: "b",
        children: []
      })
    ).toBe(true);
  });
  it("book lists have correct number of books", () => {
    expect(Object.keys(defaultNTBooks).length).toBe(27);
    expect(Object.keys(defaultOTBooks).length).toBe(39);
  });
});

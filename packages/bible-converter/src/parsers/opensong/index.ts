import parseFromXML = require("xml-parser");

import { booksOrder } from "@scripture-app/common";
import { BibleObject } from "@scripture-app/types";

import { ParserFunc } from "../../types";

/**
 * param filePath {string} Path to file
 */
const parse: ParserFunc = (data: string, name: string) => {
  const parsedXml = parseFromXML(data.toString());
  const books = parsedXml.root.children;
  const bibleObj: BibleObject = {
    name,
    books: {},
    v11n: {}
  };

  books.forEach((book, index) => {
    bibleObj.books[booksOrder[index]] = {
      chapters: []
    };
    bibleObj.books[booksOrder[index]].chapters = book.children.map(chapter => ({
      verses: chapter.children.map(verse => verse.content || "")
    }));

    // V11n (versification): number of verses for each chapter
    bibleObj.v11n[booksOrder[index]] = book.children.map(
      chapter => chapter.children.length
    );
  });
  return bibleObj;
};

export default parse;

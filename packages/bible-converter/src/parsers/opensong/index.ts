import parseFromXML = require("xml-parser");

import { organization } from "@scripture-app/common";

import { ParserFunc, IBibleObject } from "../../types";

const { booksOrder } = organization;

/**
 * param filePath {string} Path to file
 */
const parse: ParserFunc = (data: string, name: string) => {
  const parsedXml = parseFromXML(data.toString());
  const books = parsedXml.root.children;
  const bibleObj: IBibleObject = {
    name,
    books: {},
    stats: {}
  };

  books.forEach((book, index) => {
    bibleObj.books[booksOrder[index]] = {
      chapters: []
    };
    bibleObj.books[booksOrder[index]].chapters = book.children.map(chapter => ({
      verses: chapter.children.map(verse => verse.content || "")
    }));

    // Stats: number of verses for each chapter
    bibleObj.stats[booksOrder[index]] = book.children.map(
      chapter => chapter.children.length
    );
  });
  return bibleObj;
};

export default parse;

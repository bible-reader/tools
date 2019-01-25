import parseFromXML = require("xml-parser");

import { booksOrder } from "@bible-reader/common";
import { BibleVersionContent } from "@bible-reader/types";

import { ParserFunc } from "../../types";

const isBook = (book: any) => book.name === "b";
const isChapter = (chapter: any) => chapter.name === "c";
const isVerse = (verse: any) => verse.name === "v";

/**
 * param filePath {string} Path to file
 */
const parse: ParserFunc = (data, id, name, lang, updateProgress) => {
  const parsedXml = parseFromXML(data.toString());
  const books = parsedXml.root.children;
  const bibleObj: BibleVersionContent = {
    id,
    name,
    lang,
    books: {},
    v11n: {}
  };

  books.filter(isBook).forEach((book, index) => {
    bibleObj.books[booksOrder[index]] = {
      chapters: []
    };
    bibleObj.books[booksOrder[index]].chapters = book.children
      .filter(isChapter)
      .map(chapter => ({
        verses: chapter.children
          .filter(isVerse)
          .map(verse => verse.content || "")
      }));

    // V11n (versification): number of verses for each chapter
    bibleObj.v11n[booksOrder[index]] = book.children
      .filter(isChapter)
      .map(chapter => chapter.children.filter(isVerse).length);

    if (updateProgress) {
      // progress is current book index / number of all books (66)
      updateProgress((index + 1) / booksOrder.length, booksOrder[index]);
    }
  });
  return bibleObj;
};

export default parse;

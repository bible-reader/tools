import parseFromXML = require("xml-parser");

import { booksOrder } from "@bible-reader/common";
import { BibleVersionContent } from "@bible-reader/types";

import { ParserFunc } from "../../types";

interface BookList {
  [bookName: string]: number;
}

type Book = parseFromXML.Node;

const NUM_BOOKS_OT = 39;
const NUM_BOOKS_NT = 27;

const isBook = (otBooks: BookList, ntBooks: BookList, book: Book) =>
  book.name === "b" &&
  (otBooks[book.attributes.n] !== undefined ||
    ntBooks[book.attributes.n] !== undefined);
const isChapter = (chapter: any) => chapter.name === "c";
const isVerse = (verse: any) => verse.name === "v";

/**
 * param filePath {string} Path to file
 */
const parse: ParserFunc = (data, id, name, lang, updateProgress) => {
  const parsedXml = parseFromXML(data.toString());
  const children = parsedXml.root.children;
  const bibleObj: BibleVersionContent = {
    id,
    name,
    lang,
    books: {},
    v11n: {}
  };

  let otIndex = 0;
  let ntIndex = 0;
  const otBooks: BookList = {};
  const ntBooks: BookList = {};

  children.forEach(child => {
    if (child.name === "OT") {
      child.children.forEach(item => {
        if (otIndex < NUM_BOOKS_OT) {
          otBooks[item.attributes.n] = otIndex;
          otIndex++;
        }
      });
    }
    if (child.name === "NT") {
      child.children.forEach(item => {
        if (ntIndex < NUM_BOOKS_NT) {
          ntBooks[item.attributes.n] = ntIndex;
          ntIndex++;
        }
      });
    }
  });

  const isInBookList = (book: Book) => isBook(otBooks, ntBooks, book);

  const books = children.filter(isInBookList);
  books.forEach((book, index) => {
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

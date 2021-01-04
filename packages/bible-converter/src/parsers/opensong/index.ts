import parseFromXML = require("xml-parser");

import { booksOrder } from "@bible-reader/common";
import { BibleVersionContent } from "@bible-reader/types";

import { ParserFunc } from "../../types";

import { defaultNTBooks, defaultOTBooks } from "./defaultBookLists";

interface BookList {
  [bookName: string]: number;
}

type Book = parseFromXML.Node;

const NUM_BOOKS_OT = 39;
const NUM_BOOKS_NT = 27;

export const isBook = (
  otBooks: BookList | undefined,
  ntBooks: BookList | undefined,
  book: Book
) =>
  book.name === "b" &&
  otBooks &&
  ntBooks &&
  (otBooks[book.attributes.n] !== undefined ||
    ntBooks[book.attributes.n] !== undefined);
export const isChapter = (chapter: any) => chapter.name === "c";
export const isVerse = (verse: any) => verse.name === "v";

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
    v11n: {},
    fragmentNumbers: {}
  };

  let otIndex = 0;
  let ntIndex = 0;
  let otBooks: BookList | undefined;
  let ntBooks: BookList | undefined;

  children.forEach((child) => {
    if (child.name === "OT") {
      otBooks = {};
      child.children.forEach((item) => {
        if (otIndex < NUM_BOOKS_OT && otBooks) {
          otBooks[item.attributes.n] = otIndex;
          otIndex++;
        }
      });
    }
    if (child.name === "NT") {
      ntBooks = {};
      child.children.forEach((item) => {
        if (ntIndex < NUM_BOOKS_NT && ntBooks) {
          ntBooks[item.attributes.n] = ntIndex;
          ntIndex++;
        }
      });
    }
  });

  if (otBooks === undefined) {
    otBooks = defaultOTBooks;
  }
  if (ntBooks === undefined) {
    ntBooks = defaultNTBooks;
  }

  const isInBookList = (book: Book) => isBook(otBooks, ntBooks, book);

  const books = children.filter(isInBookList);
  books.forEach((book, index) => {
    const bookID = booksOrder[index];

    bibleObj.books[bookID] = {
      chapters: []
    };
    bibleObj.books[bookID].chapters = book.children
      .filter(isChapter)
      .map((chapter) => ({
        fragments: chapter.children
          .filter(isVerse)
          .map((verse, index) => ({ v: index + 1, t: verse.content || "" }))
      }));

    // V11n (versification): number of verses for each chapter
    bibleObj.v11n[bookID] = book.children
      .filter(isChapter)
      .map((chapter) => chapter.children.filter(isVerse).length);

    // Fragments - number of verses (or fragments of verses) up to the current chapter
    bibleObj.fragmentNumbers[bookID] = bibleObj.v11n[bookID].reduce(
      (previous: number[], current, currentIndex) => [
        ...previous,
        currentIndex === 0 ? current : current + previous[currentIndex - 1]
      ],
      []
    );

    if (updateProgress) {
      // progress is current book index / number of all books (66)
      updateProgress((index + 1) / booksOrder.length, bookID);
    }
  });
  return bibleObj;
};

export default parse;

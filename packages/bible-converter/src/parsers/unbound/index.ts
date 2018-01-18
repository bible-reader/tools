import { organization } from "@scripture-app/common";

import { ParserFunc, IBibleObject } from "../../types";

const { booksOrder } = organization;

/**
 * param filePath {string} Path to file
 */
const parse: ParserFunc = (data: string, name: string) => {
  const lines = data.toString().split("\n");

  const bibleObj: IBibleObject = {
    name,
    books: {},
    stats: {}
  };

  // Indexes of tab-separated columns initialized
  let bookIndex = -1;
  let chapterIndex = -1;
  let verseIndex = -1;
  let textIndex = -1;

  lines.forEach(line => {
    const normalLine = line.trim();

    if (normalLine.length > 0 && normalLine.indexOf("#columns") === 0) {
      const lineParts = normalLine.split("\t");
      lineParts.forEach((part, index) => {
        switch (part) {
          case "orig_book_index":
            bookIndex = index - 1;
            return;
          case "orig_chapter":
            chapterIndex = index - 1;
            return;
          case "orig_verse":
            verseIndex = index - 1;
            return;
          case "text":
            textIndex = index - 1;
            return;
          default:
            return;
        }
      });
    }

    if (normalLine.length > 0 && normalLine[0] !== "#") {
      if (bookIndex === -1) {
        throw new Error(
          "No line starting with #columns was encountered in this file."
        );
      }

      const lineParts = normalLine.split("\t");
      const bookNumber = parseInt(lineParts[bookIndex], 10);
      const chapterNumber = parseInt(lineParts[chapterIndex], 10);
      const verseNumber = parseInt(lineParts[verseIndex], 10);
      const verseText = lineParts[textIndex];

      // For now, there is no support for apocryphas
      if (bookNumber <= 66) {
        // create book object if it does not exist (in stats, too)
        if (bibleObj.books[booksOrder[bookNumber - 1]] === undefined) {
          bibleObj.books[booksOrder[bookNumber - 1]] = {
            chapters: []
          };
          bibleObj.stats[booksOrder[bookNumber - 1]] = [];
        }
        const book = bibleObj.books[booksOrder[bookNumber - 1]];

        // create chapter object if it does not exist
        if (book.chapters[chapterNumber - 1] === undefined) {
          book.chapters[chapterNumber - 1] = {
            verses: []
          };
        }
        const chapter = book.chapters[chapterNumber - 1];

        chapter.verses[verseNumber - 1] = verseText;
      }
    }
  });

  // Stats: number of verses for each chapter
  Object.keys(bibleObj.stats).forEach(bookSlug => {
    bibleObj.stats[bookSlug] = bibleObj.books[bookSlug].chapters.map(
      chapter => chapter.verses.length
    );
  });

  return bibleObj;
};

export default parse;

import conf from "../../conf";

import { ParserFunc, IBibleObject } from "../../types";

const { booksOrder } = conf;

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

  lines.forEach(line => {
    const normalLine = line.trim();
    if (normalLine.length > 0 && normalLine[0] !== "#") {
      const lineParts = normalLine.split("\t");
      const bookNumber = parseInt(lineParts[0], 10);
      const chapterNumber = parseInt(lineParts[1], 10);
      const verseNumber = parseInt(lineParts[2], 10);
      const verseText = lineParts[3];

      // create book object if it does not exist
      if (bibleObj.books[booksOrder[bookNumber - 1]] === undefined) {
        bibleObj.books[booksOrder[bookNumber - 1]] = {
          chapters: []
        };
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
  });

  return bibleObj;
};

export default parse;

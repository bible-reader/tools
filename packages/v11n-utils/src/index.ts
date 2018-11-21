import { Versification } from "@bible-reader/types";

export const getPreviousChapter = (
  v11n: Versification,
  { book, chapter }: { book: string; chapter: number }
) => {
  const booksArray = Object.keys(v11n);

  const bookIndex = booksArray.indexOf(book);
  let nextBook;
  let nextChapter;
  if (chapter > 1) {
    nextBook = book;
    nextChapter = chapter - 1;
  } else {
    nextBook = booksArray[bookIndex - 1];
    nextChapter = v11n[nextBook].length;
  }
  return {
    book: nextBook,
    chapter: nextChapter
  };
};

export const getNextChapter = (
  v11n: Versification,
  { book, chapter }: { book: string; chapter: number }
) => {
  const currentBookNumChapters = v11n[book].length;
  const booksArray = Object.keys(v11n);

  const bookIndex = booksArray.indexOf(book);
  let nextBook;
  let nextChapter;
  if (chapter < currentBookNumChapters) {
    nextBook = book;
    nextChapter = chapter + 1;
  } else {
    nextBook = booksArray[bookIndex + 1];
    nextChapter = 1;
  }
  return {
    book: nextBook,
    chapter: nextChapter
  };
};

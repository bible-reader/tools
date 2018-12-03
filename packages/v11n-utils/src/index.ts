import { Versification } from "@bible-reader/types";

export function chapterExists(
  v11n: Versification,
  book: string,
  chapter: number
) {
  return v11n[book] ? (v11n[book][chapter - 1] ? true : false) : false;
}

export function verseExists(
  v11n: Versification,
  book: string,
  chapter: number,
  verse: number
) {
  return verse > 0 && verse <= v11n[book][chapter - 1];
}

export function getPreviousChapter(
  v11n: Versification,
  { book, chapter }: { book: string; chapter: number }
) {
  if (!chapterExists(v11n, book, chapter)) {
    return null;
  }

  const booksArray = Object.keys(v11n);

  const bookIndex = booksArray.indexOf(book);
  let nextBook;
  let nextChapter;
  if (chapter > 1) {
    nextBook = book;
    nextChapter = chapter - 1;
  } else {
    nextBook = booksArray[bookIndex - 1];

    if (nextBook === undefined) {
      return null;
    }
    nextChapter = v11n[nextBook].length;
  }

  return {
    book: nextBook,
    chapter: nextChapter
  };
}

export function getNextChapter(
  v11n: Versification,
  { book, chapter }: { book: string; chapter: number }
) {
  if (!chapterExists(v11n, book, chapter)) {
    return null;
  }

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

  if (nextBook === undefined) {
    return null;
  }

  return {
    book: nextBook,
    chapter: nextChapter
  };
}

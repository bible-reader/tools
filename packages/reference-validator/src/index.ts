import { Versification } from "@scripture-app/types";

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

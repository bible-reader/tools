type NumberOfVerses = number;

/**
 * Versification lists number of verses per each chapter.
 */
export type Versification = {
  [bookID: string]: NumberOfVerses[];
};

/**
 * Fragments is one number for every chapter.
 * It is a number of fragments (mostly verses or parts of verses)
 * from the start of the current book up to the end of current chapter.
 */
export type FragmentNumbers = {
  [bookID: string]: number[];
};

export interface Passage {
  bookNameShort: string;
  bookNumber: number;
  startChapter: number;
  startVerse: number;
  endChapter: number;
  endVerse: number;
  invalidRef?: boolean;
  invalidRefMessage?: string;
}

export interface ChapterReference {
  versionId: string;
  book: string;
  chapter: number;
}

export interface Fragment {
  v: number; // verse number
  t: string; // verse text
}

export interface Chapter extends ChapterReference {
  fragments: Fragment[];
  loading: boolean;
}

export interface VerseReference extends ChapterReference {
  verse: number;
}

export interface ChapterContent {
  fragments: Fragment[];
}

export interface Book {
  chapters: ChapterContent[];
}

export interface BibleBooks {
  [key: string]: Book;
}

export interface BibleVersion {
  id: string;
  name: string;
  lang: string;
  v11n: Versification;
  fragmentNumbers: FragmentNumbers;
}
export interface BibleVersionContent extends BibleVersion {
  books: BibleBooks;
}

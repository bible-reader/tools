declare type NumberOfVerses = number;
/**
 * Versification lists number of verses per each chapter.
 */
export declare type Versification = {
    [bookID: string]: NumberOfVerses[];
};
/**
 * Fragments is one number for every chapter.
 * It is a number of fragments (mostly verses or parts of verses)
 * from the start of the current book up to the end of current chapter.
 */
export declare type Fragments = {
    [bookID: string]: NumberOfVerses[];
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
export interface Chapter extends ChapterReference {
    verses: string[];
    loading: boolean;
}
export interface VerseReference extends ChapterReference {
    verse: number;
}
export interface ChapterContent {
    verses: string[];
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
    fragments: Fragments;
}
export interface BibleVersionContent extends BibleVersion {
    books: BibleBooks;
}
export {};

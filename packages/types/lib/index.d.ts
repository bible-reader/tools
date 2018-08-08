export declare type Versification = {
    [key: string]: number[];
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
}
export interface BibleVersionContent extends BibleVersion {
    books: BibleBooks;
}

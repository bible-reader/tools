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
export interface Chapter {
    verses: string[];
}
export interface Book {
    chapters: Chapter[];
}
export interface BibleBooks {
    [key: string]: Book;
}
export interface BibleVersion {
    name: string;
    books: BibleBooks;
    v11n: Versification;
}

import { Versification } from "@bible-reader/types";
export declare function chapterExists(v11n: Versification, book: string, chapter: number): boolean;
export declare function verseExists(v11n: Versification, book: string, chapter: number, verse: number): boolean;
export declare function getPreviousChapter(v11n: Versification, { book, chapter }: {
    book: string;
    chapter: number;
}): {
    book: string;
    chapter: number;
} | null;
export declare function getNextChapter(v11n: Versification, { book, chapter }: {
    book: string;
    chapter: number;
}): {
    book: string;
    chapter: number;
} | null;

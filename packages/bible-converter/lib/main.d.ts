import { BibleVersionContent, Book } from "@bible-reader/types";
declare type Hash = string;
export interface BooksHashes {
    [bookId: string]: Hash;
}
export interface ChaptersHashes {
    [bookId: string]: Hash[];
}
export declare const writeChapters: (bookPath: string, bookObj: Book) => Promise<{
    book: Hash;
    chapters: Hash[];
}>;
export declare const writeBookFolders: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<{
    booksHashes: BooksHashes;
    chaptersHashes: ChaptersHashes;
}>;
export declare const splitByChapters: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<string>;
export declare const toOneJSONFile: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
export declare const generate: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<string>;
declare const _default: {
    generate: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<string>;
    toOneJSONFile: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
    splitByChapters: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<string>;
    writeBookFolders: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<{
        booksHashes: BooksHashes;
        chaptersHashes: ChaptersHashes;
    }>;
    writeChapters: (bookPath: string, bookObj: Book) => Promise<{
        book: string;
        chapters: string[];
    }>;
};
export default _default;

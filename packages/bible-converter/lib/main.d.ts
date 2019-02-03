import { BibleVersionContent, Book } from "@bible-reader/types";
declare type Hash = string;
interface BooksHashes {
    [bookId: string]: Hash;
}
export declare const writeChapters: (bookPath: string, bookObj: Book) => Promise<string>;
export declare const writeBookFolders: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<BooksHashes>;
export declare const splitByChapters: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<BooksHashes | undefined>;
export declare const toOneJSONFile: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
export declare const generate: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<BooksHashes | undefined>;
declare const _default: {
    generate: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<BooksHashes | undefined>;
    toOneJSONFile: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
    splitByChapters: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<BooksHashes | undefined>;
    writeBookFolders: (outputPath: string, bibleObj: BibleVersionContent, updateProgress?: ((progress: number, message: string) => void) | undefined) => Promise<BooksHashes>;
    writeChapters: (bookPath: string, bookObj: Book) => Promise<string>;
};
export default _default;

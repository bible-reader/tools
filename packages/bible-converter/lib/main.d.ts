import { BibleVersionContent, Book } from "@bible-reader/types";
export declare const writeChapters: (bookPath: string, bookObj: Book) => Promise<void>;
export declare const writeBookFolders: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
export declare const splitByChapters: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
export declare const toOneJSONFile: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
export declare const generate: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
declare const _default: {
    generate: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
    toOneJSONFile: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
    splitByChapters: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
    writeBookFolders: (outputPath: string, bibleObj: BibleVersionContent) => Promise<void>;
    writeChapters: (bookPath: string, bookObj: Book) => Promise<void>;
};
export default _default;

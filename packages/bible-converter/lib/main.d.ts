import { BibleVersion, Book } from "@scripture-app/types";
export declare const writeChapters: (bookPath: string, bookObj: Book) => Promise<void>;
export declare const writeBookFolders: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
export declare const splitByChapters: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
export declare const toOneJSONFile: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
export declare const generate: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
declare const _default: {
    generate: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
    toOneJSONFile: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
    splitByChapters: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
    writeBookFolders: (outputPath: string, bibleObj: BibleVersion) => Promise<void>;
    writeChapters: (bookPath: string, bookObj: Book) => Promise<void>;
};
export default _default;

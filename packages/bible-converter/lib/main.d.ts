import { BibleObject, Book } from "@scripture-app/types";
export declare const writeChapters: (bookPath: string, bookObj: Book) => Promise<void>;
export declare const writeBookFolders: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
export declare const splitByChapters: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
export declare const toOneJSONFile: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
export declare const generate: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
declare const _default: {
    generate: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
    toOneJSONFile: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
    splitByChapters: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
    writeBookFolders: (outputPath: string, bibleObj: BibleObject) => Promise<void>;
    writeChapters: (bookPath: string, bookObj: Book) => Promise<void>;
};
export default _default;

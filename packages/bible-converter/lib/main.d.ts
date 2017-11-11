import { IBibleObject, IBook } from "./types";
export declare const writeChapters: (bookPath: string, bookObj: IBook) => Promise<void>;
export declare const writeBookFolders: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
export declare const splitByChapters: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
export declare const toOneJSONFile: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
export declare const generate: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
declare const _default: {
    generate: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
    toOneJSONFile: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
    splitByChapters: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
    writeBookFolders: (outputPath: string, bibleObj: IBibleObject) => Promise<void>;
    writeChapters: (bookPath: string, bookObj: IBook) => Promise<void>;
};
export default _default;

export interface IChapter {
    verses: string[];
}
export interface IBook {
    chapters: IChapter[];
}
export interface IBibleBooks {
    [key: string]: IBook;
}
export interface IBibleVersification {
    [key: string]: number[];
}
export interface IBibleObject {
    name: string;
    books: IBibleBooks;
    v11n: IBibleVersification;
}
export declare type ParserFunc = (filePath: string, name: string) => IBibleObject;

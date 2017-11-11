export interface IChapter {
    verses: string[];
}
export interface IBook {
    slug: string;
    name: string;
    chapters: Array<IChapter>;
}
export interface IBibleBooks {
    [key: string]: IBook;
}
export interface IBibleStats {
    [key: string]: number[];
}
export interface IBibleObject {
    name: string;
    books: IBibleBooks;
    stats: IBibleStats;
}
export declare type ParserFunc = (filePath: string) => Promise<IBibleObject>;

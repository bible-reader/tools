import parseFromXML = require("xml-parser");
import { ParserFunc } from "../../types";
interface BookList {
    [bookName: string]: number;
}
declare type Book = parseFromXML.Node;
export declare const isBook: (otBooks: BookList | undefined, ntBooks: BookList | undefined, book: Book) => boolean | undefined;
export declare const isChapter: (chapter: any) => boolean;
export declare const isVerse: (verse: any) => boolean;
/**
 * param filePath {string} Path to file
 */
declare const parse: ParserFunc;
export default parse;

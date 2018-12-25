import { BibleVersionContent } from "@bible-reader/types";
export declare type ParserFunc = (data: string, id: string, name: string, lang: string, onProgressCallback?: (progress: number, message: string) => void) => BibleVersionContent;

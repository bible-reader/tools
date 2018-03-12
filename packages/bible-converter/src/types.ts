import { BibleObject } from "@scripture-app/types";

export type ParserFunc = (filePath: string, name: string) => BibleObject;

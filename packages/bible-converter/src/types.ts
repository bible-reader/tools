import { BibleVersion } from "@scripture-app/types";

export type ParserFunc = (filePath: string, name: string) => BibleVersion;

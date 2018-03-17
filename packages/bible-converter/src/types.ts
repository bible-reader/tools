import { BibleVersion } from "@scripture-app/types";

export type ParserFunc = (
  filePath: string,
  id: string,
  name: string,
  lang: string
) => BibleVersion;

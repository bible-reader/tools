import { BibleVersionContent } from "@bible-reader/types";

export type ParserFunc = (
  data: string,
  id: string,
  name: string,
  lang: string
) => BibleVersionContent;

import { BibleVersionContent } from "@scripture-app/types";

export type ParserFunc = (
  data: string,
  id: string,
  name: string,
  lang: string
) => BibleVersionContent;

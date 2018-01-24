import { Versification } from "@scripture-app/common";
declare function parsePassage(v11n: Versification, bookNameShort: string, passageString: string): {
    bookNameShort: string;
    bookNumber: number;
    startChapter: number;
    startVerse: number;
    endChapter: number;
    endVerse: number;
    invalidRef?: boolean | undefined;
    invalidRefMessage?: string | undefined;
};
export default parsePassage;

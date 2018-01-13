import { BookStats } from "@scripture-app/common";
declare function parsePassage(bookStats: BookStats, bookNameShort: string, passageString: string): {
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

export declare type Versification = {
    [key: string]: Array<number>;
};
export interface Passage {
    bookNameShort: string;
    bookNumber: number;
    startChapter: number;
    startVerse: number;
    endChapter: number;
    endVerse: number;
    invalidRef?: boolean;
    invalidRefMessage?: string;
}

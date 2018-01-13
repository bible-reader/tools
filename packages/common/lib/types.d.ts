export declare type BookNumbers = {
    [key: string]: number;
};
export declare type BookStats = {
    [key: string]: Array<number>;
};
export declare type Passage = {
    bookNameShort: string;
    bookNumber: number;
    startChapter: number;
    startVerse: number;
    endChapter: number;
    endVerse: number;
    invalidRef?: boolean;
    invalidRefMessage?: string;
};

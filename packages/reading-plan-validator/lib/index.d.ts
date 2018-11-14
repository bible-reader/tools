import { Versification, Passage } from "@bible-reader/types";
declare type Error = {
    passageIndex: number;
    isError: boolean;
    message: string;
};
declare function validateReadingPlan(passages: Array<Passage>, versification: Versification, checkContinuity?: boolean): Error[];
export default validateReadingPlan;

import { Versification, Passage } from "@bible-reader/types";
declare function validateReadingPlan(passages: Array<Passage>, versification: Versification, checkContinuity?: boolean): {
    passageIndex: number;
    isError: boolean;
    message: string;
}[];
export default validateReadingPlan;

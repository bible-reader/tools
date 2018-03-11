import { Versification, Passage } from "@scripture-app/types";
declare function validateReadingPlan(passages: Array<Passage>, versification: Versification, checkContinuity?: boolean): {
    passageIndex: number;
    isError: boolean;
    message: string;
}[];
export default validateReadingPlan;

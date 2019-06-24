import { SurgeryNotIndicatedReasonEnum } from '../enums/surgery-not-indicated-reason-enum';

export class SurgeryNotIndicated {
    reason: SurgeryNotIndicatedReasonEnum;
    reasonOther: string;
    dateRecorded: string;
}
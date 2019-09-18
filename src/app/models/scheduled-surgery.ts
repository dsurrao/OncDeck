import { SurgeryTypeEnum } from '../enums/surgery-type-enum';

export class ScheduledSurgery {
    facility: string;
    surgeonName: string;
    scheduledDate: string;
    type: SurgeryTypeEnum;
    id: string;
}
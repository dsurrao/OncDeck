import { CompletedBiopsy } from './completed-biopsy';
import { ScheduledBiopsy } from './scheduled-biopsy';
import { BiopsyNotIndicated } from './biopsy-not-indicated';
import { BiopsyNotScheduled } from './biopsy-not-scheduled';
import { BiopsyStatusEnum } from '../enums/biopsy-status-enum';

export class Biopsy {
    status: BiopsyStatusEnum;
    completedBiopsies: CompletedBiopsy[];
    scheduledBiopsy: ScheduledBiopsy;
    notIndicated: BiopsyNotIndicated;
    notScheduled: BiopsyNotScheduled;
}
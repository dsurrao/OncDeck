import { BiopsyStatus } from './biopsy-status';
import { CompletedBiopsy } from './completed-biopsy';
import { ScheduledBiopsy } from './scheduled-biopsy';
import { BiopsyNotIndicated } from './biopsy-not-indicated';
import { BiopsyNotScheduled } from './biopsy-not-scheduled';

export class Biopsy {
    status: BiopsyStatus;
    completedBiopsies: CompletedBiopsy[];
    scheduledBiopsy: ScheduledBiopsy;
    notIndicated: BiopsyNotIndicated;
    notScheduled: BiopsyNotScheduled;
}
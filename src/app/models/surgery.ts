import { CompletedSurgery } from './completed-surgery';
import { SurgeryStatusEnum } from '../enums/surgery-status-enum';
import { ScheduledSurgery } from './scheduled-surgery';
import { SurgeryNotScheduled } from './surgery-not-scheduled';
import { SurgeryNotIndicated } from './surgery-not-indicated';

export class Surgery {
    surgeryStatus: SurgeryStatusEnum;
    scheduledSurgery: ScheduledSurgery;
    surgeryNotScheduled: SurgeryNotScheduled;
    surgeryNotIndicated: SurgeryNotIndicated;
    completedSurgeries: CompletedSurgery[];
}
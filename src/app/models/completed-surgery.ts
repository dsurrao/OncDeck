import { SurgicalPathologyStatusEnum } from '../enums/surgical-pathology-status-enum';
import { SurgicalPathology } from './surgical-pathology';

export class CompletedSurgery {
    id: string;
    report: string;
    surgeryDate: string;
    surgeonName: string;
    facility: string;
    pathologyStatus: SurgicalPathologyStatusEnum;
    pathology: SurgicalPathology;
}
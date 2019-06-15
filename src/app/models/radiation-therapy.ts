import { RadiationFieldTreated } from './radiation-field-treated';

export class RadiationTherapy {
    id: string; 
    // ISO 8601 Datetime Format: YYYY-MM-DDTHH:mmZ
    startDate: string;
    totalDose: string;
    numTreatments: number;
    fieldsTreated: RadiationFieldTreated[];
    projectedEndDate: string; // startDate + numTreatments + weekend days/holidays
    actualEndDate: string;
    comments: string;
}
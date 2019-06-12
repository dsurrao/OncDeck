import { RadiationFieldTreated } from './radiation-field-treated';

export class RadiationTherapy {
    id: string; 
    startDate: Date;
    totalDose: string;
    numTreatments: number;
    fieldsTreated: RadiationFieldTreated[];
    projectedEndDate: Date; // startDate + numTreatments + weekend days/holidays
    actualEndDate: Date;
    comments: string;
}
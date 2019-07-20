import { PatientList } from '../../models/patient-list';
import { PatientListFilterEnum } from '../../enums/patient-list-filter-enum';

export interface PatientListServiceInterface {
    getPatients(args: object): Promise<PatientList>;
    getPatientsByFilter(filter: PatientListFilterEnum, args: object): Promise<PatientList>;
    getPatientsWithNoScheduledSurgery(): Promise<PatientList>;
    getPatientsScheduledForSurgery(): Promise<PatientList>;
    getPatientsScheduledForBiopsy(): Promise<PatientList>;
}

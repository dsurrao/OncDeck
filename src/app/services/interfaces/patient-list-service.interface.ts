import { PatientList } from '../../models/patient-list';
import { PatientListFilterEnum } from '../../enums/patient-list-filter-enum';
import { PatientListSortEnum } from '../../enums/patient-list-sort-enum';

export interface PatientListServiceInterface {
    getPatientList(filter: PatientListFilterEnum, 
        watcherUsername: string, 
        sort: PatientListSortEnum): Promise<PatientList>;
    getPatientListAll();
}

import { Injectable } from '@angular/core';
import { PouchdbService } from './pouchdb.service';
import { Patient } from '../models/patient';
import { resolve } from 'path';
import { SurgeryStatusEnum } from '../enums/surgery-status-enum';
import { PatientListFilterEnum } from '../enums/patient-list-filter-enum';

@Injectable({
  providedIn: 'root'
})
export class PatientListService {

  constructor(public dvSvc: PouchdbService) { }

  getPatientsByFilter(filter: PatientListFilterEnum = PatientListFilterEnum.All): Promise<Patient[]> {
    switch (filter) {
      case PatientListFilterEnum.All:
        return this.getPatients();
      case PatientListFilterEnum.NoSurgery:
        return this.getPatientsWithNoScheduledSurgery();
      case PatientListFilterEnum.ScheduledBiopsy:
        return this.getPatientsScheduledForBiopsy();
      case PatientListFilterEnum.ScheduledSurgery:
        return this.getPatientsScheduledForSurgery();
      default: 
        return new Promise((resolve, reject) => {
          reject("Invalid filter");
        })
    }
  }

  getPatients(): Promise<Patient[]> {
    return this.dvSvc.getPatients();
  }

  // TODO: these nested calls are a workaround because $or selector does not seem to work
  // TODO: check current date for missed surgeries
  getPatientsWithNoScheduledSurgery(): Promise<Patient[]> {
    return this.getPatientsByIndex(['surgery.surgeryStatus'], 
      "missed-surgery-index-design-doc",
      { 
        'surgery.surgeryStatus': {$eq: SurgeryStatusEnum.Missed}
      }
    ).then(patients => {
      return this.getPatientsByIndex(['surgery.surgeryStatus'], 
        "not-scheduled-surgery-index-design-doc",
        {
          'surgery.surgeryStatus': {$eq: SurgeryStatusEnum.NotScheduled}
        }, 
        patients
      ).then(patients => {
        return this.getPatientsByIndex(['surgery.surgeryStatus'], 
          "not-indicated-surgery-index-design-doc",
          {
            'surgery.surgeryStatus': {$eq: SurgeryStatusEnum.NotIndicated}
          }, 
          patients
        ).then(patients => {
          return this.getPatientsByIndex(['surgery'], 
            "no-surgery-index-design-doc",
            {
              'surgery': {$eq: null}
            }, 
            patients
          )
        });
      });
    });
  }

  getPatientsScheduledForSurgery(): Promise<Patient[]> {
    return this.getPatientsByIndex(['surgery.scheduledSurgery.scheduledDate'], 
      "surgery-index-design-doc",
      {
        'surgery.scheduledSurgery.scheduledDate': {$gt: new Date().toISOString()}
      }
    );
  }

  getPatientsScheduledForBiopsy(): Promise<Patient[]> {
    return this.getPatientsByIndex(['biopsy.scheduledBiopsy.scheduledDate'], 
      "biopsy-index-design-doc",
      {
        'biopsy.scheduledBiopsy.scheduledDate': {$gt: new Date().toISOString()}
      }
    );
  }

  getPatientsByIndex(indexFields: string[], indexName: string, iSelector: any, 
    listToAppend: Patient[] = null): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      let patients: Patient[] = null;
      let db: any = this.dvSvc.getDb();
      db.createIndex({
        index: {
          fields: indexFields,
          ddoc: indexName
        }
      }).then(function () {
        db.find({
          selector: iSelector,
          use_index: indexName
        }).then(result => {
          patients = result.docs;
          if (listToAppend != null) {
            patients = patients.concat(listToAppend);
          }
          resolve(patients);
        }).catch((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}

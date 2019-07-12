import { Injectable } from '@angular/core';
import { PouchdbService } from './pouchdb.service';
import { Patient } from '../models/patient';
import { SurgeryStatusEnum } from '../enums/surgery-status-enum';
import { PatientListFilterEnum } from '../enums/patient-list-filter-enum';
import { PatientList } from '../models/patient-list';

@Injectable({
  providedIn: 'root'
})
export class PatientListService {

  constructor(public dvSvc: PouchdbService) { }

  getPatientsByFilter(filter: PatientListFilterEnum = PatientListFilterEnum.All, 
    args: object = {}): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      let patientList: Promise<PatientList>;
      switch (filter) {
        case PatientListFilterEnum.All:
          patientList = this.getPatients(args);
          break;
        case PatientListFilterEnum.NoSurgery:
          patientList =  this.getPatientsWithNoScheduledSurgery();
          break;
        case PatientListFilterEnum.ScheduledBiopsy:
          patientList =  this.getPatientsScheduledForBiopsy();
          break;
        case PatientListFilterEnum.ScheduledSurgery:
          patientList =  this.getPatientsScheduledForSurgery();
          break;
        default: 
          break;
      }

      // filter by watching provider, if passed in
      if (patientList != null) {
        if (args['watchingProvider'] != null) {
          let watchedPatientList: PatientList = new PatientList();
          watchedPatientList.patients = [];
          patientList.then(list => {
            for (let pt of list.patients) {
              if (pt.watchers != null) {
                if (pt.watchers.indexOf(args['watchingProvider']) != -1) {
                  watchedPatientList.patients.push(pt);
                }
              }
            }
            watchedPatientList.totalRows = watchedPatientList.patients.length;
            resolve(watchedPatientList);
          });
        }
        else {
          resolve(patientList);
        }
      }
      else {
        reject('No patient filter specified');
      }
    });
  }

  getPatients(args: object = {}): Promise<PatientList> {
    return this.dvSvc.getPatients(args);
  }

  // TODO: these nested calls are a workaround because $or selector does not seem to work
  // TODO: check current date for missed surgeries
  getPatientsWithNoScheduledSurgery(): Promise<PatientList> {
    return this.getPatientsByIndex(['surgery.surgeryStatus'], 
      "missed-surgery-index-design-doc",
      { 
        'surgery.surgeryStatus': {$eq: SurgeryStatusEnum.Missed}
      }
    ).then(list => {
      return this.getPatientsByIndex(['surgery.surgeryStatus'], 
        "not-scheduled-surgery-index-design-doc",
        {
          'surgery.surgeryStatus': {$eq: SurgeryStatusEnum.NotScheduled}
        }, 
        list.patients
      ).then(list => {
        return this.getPatientsByIndex(['surgery.surgeryStatus'], 
          "not-indicated-surgery-index-design-doc",
          {
            'surgery.surgeryStatus': {$eq: SurgeryStatusEnum.NotIndicated}
          }, 
          list.patients
        ).then(list => {
          return this.getPatientsByIndex(['surgery'], 
            "no-surgery-index-design-doc",
            {
              'surgery': {$eq: null}
            }, 
            list.patients
          )
        });
      });
    });
  }

  getPatientsScheduledForSurgery(): Promise<PatientList> {
    return this.getPatientsByIndex(['surgery.scheduledSurgery.scheduledDate'], 
      "surgery-index-design-doc",
      {
        'surgery.scheduledSurgery.scheduledDate': {$gt: new Date().toISOString()}
      }
    );
  }

  getPatientsScheduledForBiopsy(): Promise<PatientList> {
    return this.getPatientsByIndex(['biopsy.scheduledBiopsy.scheduledDate'], 
      "biopsy-index-design-doc",
      {
        'biopsy.scheduledBiopsy.scheduledDate': {$gt: new Date().toISOString()}
      }
    );
  }

  getPatientsByIndex(indexFields: string[], indexName: string, iSelector: any, 
    listToAppend: Patient[] = null): Promise<PatientList> {
    return new Promise((resolve, reject) => {
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
          let list: PatientList = new PatientList();
          list.patients = result.docs;
          list.totalRows = list.patients.length;
          if (listToAppend != null) {
            list.patients = list.patients.concat(listToAppend);
          }
          resolve(list);
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

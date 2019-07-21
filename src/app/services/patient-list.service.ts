import { Injectable } from '@angular/core';
import { PouchdbService } from './pouchdb.service';
import { SurgeryStatusEnum } from '../enums/surgery-status-enum';
import { PatientListFilterEnum } from '../enums/patient-list-filter-enum';
import { PatientList } from '../models/patient-list';

@Injectable({
  providedIn: 'root'
})
export class PatientListService {

  constructor(public dbSvc: PouchdbService) { }

  getPatientsByFilter(filter: PatientListFilterEnum = PatientListFilterEnum.All, 
    args: object = {}): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      let patientListPromise: Promise<PatientList>;
      switch (filter) {
        case PatientListFilterEnum.All:
          patientListPromise = this.getPatients(args);
          break;
        case PatientListFilterEnum.NotScheduled:
          patientListPromise =  this.getPatientsWithNoScheduledSurgery();
          break;
        case PatientListFilterEnum.ScheduledBiopsy:
          patientListPromise =  this.getPatientsScheduledForBiopsy();
          break;
        case PatientListFilterEnum.ScheduledSurgery:
          patientListPromise =  this.getPatientsScheduledForSurgery();
          break;
        default: 
          break;
      }

      // filter by watching provider, if passed in
      if (patientListPromise != null) {
        if (args['watchingProvider'] != null) {
          let watchedPatientList: PatientList = new PatientList();
          watchedPatientList.patients = [];
          patientListPromise.then(list => {
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
          resolve(patientListPromise);
        }
      }
      else {
        reject('No patient filter specified');
      }
    });
  }

  getPatients(args: object = {}): Promise<PatientList> {
    return this.dbSvc.getPatients(args);
  }

  getPatientsWithNoScheduledSurgery(): Promise<PatientList> {
    let selectorArray = [
      {'surgery': null},
      {'surgery.surgeryStatus': SurgeryStatusEnum.Missed},
      {'surgery.surgeryStatus': SurgeryStatusEnum.NotIndicated},
      {'surgery.surgeryStatus': SurgeryStatusEnum.NotScheduled},
      {'surgery.scheduledSurgery.scheduledDate': {$gt: new Date().toISOString()}}
    ];
    let selector = { 
      '$or': selectorArray
    };
    return this.getPatientsBySelector(selector);
  }

  getPatientsScheduledForSurgery(): Promise<PatientList> {
    let selector = {
      'surgery.scheduledSurgery.scheduledDate': {$gt: new Date().toISOString()}
    }
    return this.getPatientsBySelector(selector);
  }

  getPatientsScheduledForBiopsy(): Promise<PatientList> {
    let selector = {
      'biopsy.scheduledBiopsy.scheduledDate': {$gt: new Date().toISOString()}
    }
    return this.getPatientsBySelector(selector);
  }

  private getPatientsBySelector(iSelector: any): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      let db: any = this.dbSvc.getDb();
        db.find({
          selector: iSelector
        }).then(result => {
          let list: PatientList = new PatientList();
          list.patients = result.docs;
          list.totalRows = list.patients.length;
          resolve(list);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  private getPatientsByIndex(indexFields: string[], indexName: string, iSelector: any): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      let db: any = this.dbSvc.getDb();
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

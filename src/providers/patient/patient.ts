import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from "../../models/patient";
import { PouchdbProvider } from '../pouchdb/pouchdb';

/*
  Generated class for the PatientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatientProvider {

  constructor(public http: HttpClient, public db: PouchdbProvider) {
  }

  // pass in credentials from caller, maybe this should be the way to do it?
  getPatients(showOnlyMyPatients: boolean, myUsername: string, credentials: any): Promise<Patient[]> {
    return this.db.getPatients();
  }

  savePatient(patient: Patient): Promise<Patient> {
    return this.db.savePatient(patient);
  }

  removePatient(patient: Patient): Promise<Patient> {
    return this.db.removePatient(patient);
  }

  watchPatient(patient: Patient, deviceUuid: string): Promise<Patient> {
    if (patient.watchers == null) {
      patient.watchers = [];
    }
    if (patient.watchers.indexOf(deviceUuid) == -1) {
      patient.watchers.push(deviceUuid);
    }
    return this.savePatient(patient);
  }

  unWatchPatient(patient: Patient, deviceUuid: string): Promise<Patient> {
    if (patient.watchers != null) {
      let foundIndex: number = patient.watchers.indexOf(deviceUuid);
      if (foundIndex != -1) {
        patient.watchers.splice(foundIndex, 1);
      }
    }
    return this.savePatient(patient);
  }
}

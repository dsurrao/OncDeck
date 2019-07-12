import { Injectable } from '@angular/core';
import { Patient } from "../models/patient";
import { PouchdbService } from './pouchdb.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public dbSvc: PouchdbService) {
  }

  getPatient(id): Promise<Patient> {
    return this.dbSvc.getDocument(id);
  }

  savePatient(patient: Patient): Promise<Patient> {
    return this.dbSvc.savePatient(patient);
  }

  removePatient(patient: Patient): Promise<Patient> {
    return this.dbSvc.removePatient(patient);
  }

  watchPatient(patient: Patient, username: string): Promise<Patient> {
    if (patient.watchers == null) {
      patient.watchers = [];
    }
    if (patient.watchers.indexOf(username) == -1) {
      patient.watchers.push(username);
    }
    return this.savePatient(patient);
  }

  unWatchPatient(patient: Patient, username: string): Promise<Patient> {
    if (patient.watchers != null) {
      let foundIndex: number = patient.watchers.indexOf(username);
      if (foundIndex != -1) {
        patient.watchers.splice(foundIndex, 1);
      }
    }
    return this.savePatient(patient);
  }
}

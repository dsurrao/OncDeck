import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from "../models/patient";
import { PouchdbService } from './pouchdb.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient, public dbSvc: PouchdbService) {
  }

  // pass in credentials from caller?
  getPatients(): Promise<Patient[]> {
    return this.dbSvc.getPatients();
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

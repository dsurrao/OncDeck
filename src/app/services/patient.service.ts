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

  public notScheduled(pt: Patient): boolean {
    return !this.scheduledForBiopsy(pt) && !this.scheduledForSurgery(pt);
  }
  
  public scheduledForBiopsy(pt: Patient): boolean {
    let flag: boolean = false;
    if (pt.biopsy != null) {
      if (pt.biopsy.scheduledBiopsy != null) {
        if (pt.biopsy.scheduledBiopsy.scheduledDate >= new Date().toISOString()) {
          flag = true;
        }
      }
    }
    return flag;
  }

  public scheduledForSurgery(pt: Patient): boolean {
    let flag: boolean = false;
    if (pt.surgery != null) {
      if (pt.surgery.scheduledSurgery != null) {
        if (pt.surgery.scheduledSurgery.scheduledDate >= new Date().toISOString()) {
          flag = true;
        }
      }
    }
    return flag;
  }
}

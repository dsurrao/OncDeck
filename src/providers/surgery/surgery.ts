import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../models/patient';
import { Surgery } from '../../models/surgery';
import { PouchdbProvider } from '../pouchdb/pouchdb';
import UUID from 'uuid';
import { SurgicalPathology } from '../../models/surgical-pathology';

/*
  Generated class for the SurgeryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SurgeryProvider {

  constructor(public http: HttpClient, 
    public db: PouchdbProvider) {
    console.log('Hello SurgeryProvider Provider');
  }

  /* 
    save scheduled surgery info for a patient 
  */
  save(patient: Patient, surgery: Surgery): Promise<Patient> {
    if (surgery.id == null) {
      // new surgery
      if (patient.surgeries == null) {
        patient.surgeries = [];
      } 
      surgery.id = UUID.v4();
      patient.surgeries.push(surgery);
    }
    else {
      // update existing surgery
      for (var i: number = 0; i < patient.surgeries.length; i++) {
        if (patient.surgeries[i].id === surgery.id) {
          patient.surgeries[i] = surgery;
          break;
        }
      }
    }
    
    // finally, update db
    return this.db.savePatient(patient);
  }

  removeSurgery(surgery: Surgery, patient: Patient): Promise<Patient> {
    let removeIndex: number = -1;
    for (var i: number = 0; i < patient.surgeries.length; i++) {
      if (patient.surgeries[i].id === surgery.id) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex != -1) {
      patient.surgeries = patient.surgeries.splice(removeIndex - 1, 1);
    }

    // finally, update db
    return this.db.savePatient(patient);
  }

  removeSurgicalPathology(surgicalPathology: SurgicalPathology, patient: Patient): Promise<Patient> {
    let removeIndex: number = -1;
    for (var i: number = 0; i < patient.surgeries.length; i++) {
      if (patient.surgicalPathologies[i].id === surgicalPathology.id) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex != -1) {
      patient.surgicalPathologies = patient.surgicalPathologies.splice(removeIndex - 1, 1);
    }

    // finally, update db
    return this.db.savePatient(patient);
  }
}

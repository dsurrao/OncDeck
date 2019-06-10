import { Injectable } from '@angular/core';
import { PouchdbService } from './pouchdb.service';
import { Patient } from '../models/patient';
import { CompletedBiopsy } from '../models/completed-biopsy';
import { Biopsy } from '../models/biopsy';
import UUID from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BiopsyService {

  constructor(public db: PouchdbService) {}

  saveCompletedBiopsy(patient: Patient, biopsy: CompletedBiopsy): Promise<Patient> {
    if (biopsy.id == null) {
      // save new biopsy
      if (patient.biopsy == null) {
        patient.biopsy = new Biopsy();
      }
      if (patient.biopsy.completedBiopsies == null) {
        patient.biopsy.completedBiopsies = [];
      }
      biopsy.id = UUID.v4();
      patient.biopsy.completedBiopsies.push(biopsy);
    }
    else {
      // update existing biopsy
      for (var i: number = 0; i < patient.biopsy.completedBiopsies.length; i++) {
        if (patient.biopsy.completedBiopsies[i].id === biopsy.id) {
          patient.biopsy.completedBiopsies[i] = biopsy;
          break;
        }
      }
    }
    
    // finally, update db
    return this.db.savePatient(patient);
  }
}

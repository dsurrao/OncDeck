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

  saveCompletedBiopsy(patient: Patient, completedBiopsy: CompletedBiopsy): Promise<string> {
    return new Promise((resolve, reject) => {
      if (completedBiopsy.id == null) {
        // save new biopsy
        if (patient.biopsy == null) {
          patient.biopsy = new Biopsy();
        }
        if (patient.biopsy.completedBiopsies == null) {
          patient.biopsy.completedBiopsies = [];
        }
        completedBiopsy.id = UUID.v4();
        patient.biopsy.completedBiopsies.push(completedBiopsy);
      }
      else {
        // update existing biopsy
        for (var i: number = 0; i < patient.biopsy.completedBiopsies.length; i++) {
          if (patient.biopsy.completedBiopsies[i].id === completedBiopsy.id) {
            patient.biopsy.completedBiopsies[i] = completedBiopsy;
            break;
          }
        }
      }
      
      // finally, update db
      this.db.savePatient(patient).then(patient => {
        resolve(completedBiopsy.id);
      })
      .catch(error => {
        reject(completedBiopsy.id);
        console.log(error);
      });
    });
  }
}

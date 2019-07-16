import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Staging } from '../models/staging';
import { PouchdbService } from './pouchdb.service';
import UUID from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StagingService {

  constructor(public db: PouchdbService) { }

  saveStaging(staging: Staging, patient: Patient): Promise<string> {
    return new Promise((resolve, reject) => {
      if (staging.id == null) {
        // save new 
        if (patient.stagings == null) {
          patient.stagings = [];
        }
        staging.id = UUID.v4();
        patient.stagings.push(staging);
      }
      else {
        // update existing 
        for (var i: number = 0; i < patient.stagings.length; i++) {
          if (patient.stagings[i].id === staging.id) {
            patient.stagings[i] = staging;
            break;
          }
        }
      }
      
      // finally, update db
      this.db.savePatient(patient).then(patient => {
        resolve(staging.id);
      })
      .catch(error => {
        reject(staging.id);
        console.log(error);
      });
    });
  }

}

import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { RadiationTherapy } from '../models/radiation-therapy';
import { PouchdbService } from './pouchdb.service';
import UUID from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RadiationService {

  constructor(public db: PouchdbService) { }

  saveRadiationTherapy(patient: Patient, radiationTherapy: RadiationTherapy): Promise<string> {
    return new Promise((resolve, reject) => {
      if (radiationTherapy.id == null) {
        // save new 
        if (patient.radiationTherapies == null) {
          patient.radiationTherapies = [];
        }
        radiationTherapy.id = UUID.v4();
        patient.radiationTherapies.push(radiationTherapy);
      }
      else {
        // update existing 
        for (var i: number = 0; i < patient.radiationTherapies.length; i++) {
          if (patient.radiationTherapies[i].id === radiationTherapy.id) {
            patient.radiationTherapies[i] = radiationTherapy;
            break;
          }
        }
      }
      
      // finally, update db
      this.db.savePatient(patient).then(patient => {
        resolve(radiationTherapy.id);
      })
      .catch(error => {
        reject(radiationTherapy.id);
        console.log(error);
      });
    });
  }
}

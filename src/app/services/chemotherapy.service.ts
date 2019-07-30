import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Chemotherapy } from '../models/chemotherapy';
import { PouchdbService } from './pouchdb.service';
import { DateUtils } from '../common/dateutils';

@Injectable({
  providedIn: 'root'
})
export class ChemotherapyService {

  constructor(public db: PouchdbService, public dateUtils: DateUtils) { }

  saveChemotherapy(chemotherapy: Chemotherapy, patient: Patient): Promise<string> {
    return new Promise((resolve, reject) => {
      if (chemotherapy.id == null) {
        // save new 
        if (patient.chemotherapies == null) {
          patient.chemotherapies = [];
        }
        chemotherapy.id = this.dateUtils.generateUniqueId();
        patient.chemotherapies.push(chemotherapy);
      }
      else {
        // update existing 
        for (var i: number = 0; i < patient.chemotherapies.length; i++) {
          if (patient.chemotherapies[i].id === chemotherapy.id) {
            patient.chemotherapies[i] = chemotherapy;
            break;
          }
        }
      }
      
      // finally, update db
      this.db.savePatient(patient).then(patient => {
        resolve(chemotherapy.id);
      })
      .catch(error => {
        reject(chemotherapy.id);
        console.log(error);
      });
    });
  }

}

import { Injectable } from '@angular/core';
import { PouchdbService } from './pouchdb.service';
import { Patient } from '../models/patient';
import { CompletedBiopsy } from '../models/completed-biopsy';
import { Biopsy } from '../models/biopsy';
import UUID from 'uuid';
import { BiopsyStatusEnum } from '../enums/biopsy-status-enum';

@Injectable({
  providedIn: 'root'
})
export class BiopsyService {

  constructor(public db: PouchdbService) {}

  saveCompletedBiopsy(completedBiopsy: CompletedBiopsy, patient: Patient): Promise<string> {
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

      // remove obsolete biopsy info
      patient.biopsy.notIndicated = null;
      patient.biopsy.notScheduled = null;
      patient.biopsy.status = BiopsyStatusEnum.Completed;

      // remove past scheduled biopsy info, NOT future ones
      if (patient.biopsy.scheduledBiopsy != null) {
        // assumes date strings are in ISO format for comparison
        if (patient.biopsy.scheduledBiopsy.scheduledDate <= completedBiopsy.procedureDate) {
          patient.biopsy.scheduledBiopsy = null;
        }
        else {
          patient.biopsy.status = BiopsyStatusEnum.Scheduled;
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

  removeCompletedBiopsy(completedBiopsy: CompletedBiopsy, patient: Patient): Promise<Patient> {
    let removeIndex: number = -1;
    for (var i: number = 0; i < patient.biopsy.completedBiopsies.length; i++) {
      if (patient.biopsy.completedBiopsies[i].id === completedBiopsy.id) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex != -1) {
      patient.biopsy.completedBiopsies.splice(removeIndex, 1);
    }

    // finally, update db
    return this.db.savePatient(patient);
  }

  saveScheduledBiopsy(patient: Patient): Promise<Patient> {
    if (patient.biopsy != null) {
      if (patient.biopsy.scheduledBiopsy != null) {
        // remove obsolete info 
        patient.biopsy.notScheduled = null;
        patient.biopsy.notIndicated = null;
        patient.biopsy.status = BiopsyStatusEnum.Scheduled;
      }
      else {
        throw new Error('No scheduled biopsy data to save');
      }
    }
    else {
      throw new Error('No biopsy data to save');
    }

    return this.db.savePatient(patient);
  }

  saveBiopsyNotScheduled(patient: Patient): Promise<Patient> {
    if (patient.biopsy != null) {
      if (patient.biopsy.notScheduled != null) {
        // remove obsolete info 
        patient.biopsy.scheduledBiopsy = null;
        patient.biopsy.notIndicated = null;
        patient.biopsy.notScheduled.dateRecorded = new Date().toISOString();
        patient.biopsy.status = BiopsyStatusEnum.NotScheduled;
      }
      else {
        throw new Error('No biopsy not scheduled data to save');
      }
    }
    else {
      throw new Error('No biopsy data to save');
    }

    return this.db.savePatient(patient);
  }

  saveBiopsyNotIndicated(patient: Patient): Promise<Patient> {
    if (patient.biopsy != null) {
      if (patient.biopsy.notIndicated != null) {
        // remove obsolete info 
        patient.biopsy.scheduledBiopsy = null;
        patient.biopsy.notScheduled = null;
        patient.biopsy.notIndicated.dateRecorded = new Date().toISOString();
        patient.biopsy.status = BiopsyStatusEnum.NotIndicated;
      }
      else {
        throw new Error('No biopsy not indicated data to save');
      }
    }
    else {
      throw new Error('No biopsy data to save');
    }

    return this.db.savePatient(patient);
  }
}

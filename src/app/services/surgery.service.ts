import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { Surgery } from '../models/surgery';
import { PouchdbService } from './pouchdb.service';
import UUID from 'uuid';
import { DateUtils } from '../common/dateutils';
import { CompletedSurgery } from '../models/completed-surgery';
import { SurgeryStatusEnum } from '../enums/surgery-status-enum';

@Injectable({
  providedIn: 'root'
})
export class SurgeryService {

  constructor(public http: HttpClient, 
    public db: PouchdbService,
    public dateUtils: DateUtils) {
    console.log('Hello SurgeryProvider Provider');
  }

  saveCompletedSurgery(surgery: CompletedSurgery, patient: Patient): Promise<Patient> {
    if (surgery.id == null) {
      // new surgery
      if (patient.surgery == null) {
        patient.surgery = new Surgery();
      }
      if (patient.surgery.completedSurgeries == null) {
        patient.surgery.completedSurgeries = [];
      } 
      surgery.id = UUID.v4();
      patient.surgery.completedSurgeries.push(surgery);
    }
    else {
      // update existing surgery
      for (var i: number = 0; i < patient.surgery.completedSurgeries.length; i++) {
        if (patient.surgery.completedSurgeries[i].id === surgery.id) {
          patient.surgery.completedSurgeries[i] = surgery;
          break;
        }
      }
    }

    patient.surgery.surgeryStatus = this.inferSurgeryStatus(patient);
    
    return this.saveSurgeryStatus(patient);
  }

  removeCompletedSurgery(surgery: CompletedSurgery, patient: Patient): Promise<Patient> {
    let removeIndex: number = -1;
    for (var i: number = 0; i < patient.surgery.completedSurgeries.length; i++) {
      if (patient.surgery.completedSurgeries[i].id === surgery.id) {
        removeIndex = i;
        break;
      }
    }
    if (removeIndex != -1) {
      patient.surgery.completedSurgeries.splice(removeIndex, 1);
    }

    patient.surgery.surgeryStatus = this.inferSurgeryStatus(patient);

    return this.saveSurgeryStatus(patient);
  }

  saveSurgeryStatus(patient: Patient): Promise<Patient> {
    let status: SurgeryStatusEnum = patient.surgery.surgeryStatus;
    let inferredStatus: SurgeryStatusEnum = this.inferSurgeryStatus(patient);

    patient.surgery.surgeryStatus = status;

    switch (status) {
      case SurgeryStatusEnum.NotIndicated:
        if (inferredStatus == SurgeryStatusEnum.Completed) {
          throw new Error('There is a recent completed surgery');
        }
        else if (inferredStatus == SurgeryStatusEnum.Scheduled) {
          throw new Error('There is a scheduled surgery');
        }
        patient.surgery.scheduledSurgery = null;
        patient.surgery.surgeryNotScheduled = null;
        break;
      case SurgeryStatusEnum.NotScheduled:
          if (inferredStatus == SurgeryStatusEnum.Scheduled) {
            throw new Error('There is a scheduled surgery');
          }
          patient.surgery.scheduledSurgery = null;
          patient.surgery.surgeryNotIndicated = null;
          break;
        break;
      case SurgeryStatusEnum.Scheduled:
        patient.surgery.surgeryNotIndicated = null;
        patient.surgery.surgeryNotScheduled = null;
        break;
      case SurgeryStatusEnum.Completed:
        patient.surgery.surgeryNotIndicated = null;
        patient.surgery.surgeryNotScheduled = null;
        // if there is a future scheduled surgery, set status as scheduled
        if (inferredStatus == SurgeryStatusEnum.Scheduled) {
          patient.surgery.surgeryStatus = SurgeryStatusEnum.Scheduled;
        }
        else {
          patient.surgery.scheduledSurgery = null;
        }
        break;
      default:
    }

    // finally, update db
    return this.db.savePatient(patient);
  }

  inferSurgeryStatus(patient: Patient): SurgeryStatusEnum {
    let lastSurgeryDayCutoff: number = 180;
    let surgeryStatus: SurgeryStatusEnum = SurgeryStatusEnum.NotIndicated;
    if (patient.surgery != null) {      
      // if there is a completed surgery in the past 180 days, mark as complete
      if (patient.surgery.completedSurgeries.length > 0) {
        if (this.getDaysSinceLastSurgery(patient.surgery.completedSurgeries) <= lastSurgeryDayCutoff) {
          surgeryStatus = SurgeryStatusEnum.Completed;
        }
      }

      // if there is a future scheduled surgery, set status as scheduled
      if (patient.surgery.scheduledSurgery != null) {        
        if (patient.surgery.scheduledSurgery.scheduledDate >= new Date().toISOString()) {
          surgeryStatus = SurgeryStatusEnum.Scheduled;
        }
      }
    }
    return surgeryStatus;
  }

  // for the most recent completed surgery
  getDaysSinceLastSurgery(completedSurgeries: CompletedSurgery[]): number {
    let dayDiff: number = 0;
    let currDiff: number;

    for (let s of completedSurgeries) {
      // should be a negative number since it's in the past
      currDiff = this.dateUtils.daysFromToday(s.surgeryDate);
      if (dayDiff == 0) {
        dayDiff = currDiff;
      }
      else if (currDiff > dayDiff) {
        dayDiff = currDiff;
      }
    }

    // now make this difference a positive number and return it
    return -dayDiff;
  }
}

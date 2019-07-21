import { Injectable } from '@angular/core';
import { PatientList } from '../models/patient-list';
import { PatientListFilterEnum } from '../enums/patient-list-filter-enum';
import { PatientListSortEnum } from '../enums/patient-list-sort-enum';
import { PatientListServiceInterface } from './interfaces/patient-list-service.interface';
import { PouchdbService } from './pouchdb.service';
import { Patient } from '../models/patient';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class AllDocsPatientListService implements PatientListServiceInterface {

  constructor(public dbSvc: PouchdbService, public ptSvc: PatientService) { }

  public getPatientListAll(): Promise<PatientList> {
    return this.dbSvc.getPatients();
  }

  public getPatientList(filter: PatientListFilterEnum, 
    watcherUsername: string = null, 
    sort: PatientListSortEnum = null): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      this.getPatientListAll().then(ptList => {
        let pts: Patient[] = this.filterPatients(ptList.patients, filter);

        if (watcherUsername != null) {
          pts = this.getWatchedPatients(pts, watcherUsername);
        }

        if (sort != null) {
          pts = this.sortPatients(pts, sort);
        }

        ptList.patients = pts;
        ptList.totalRows = pts.length;
        resolve(ptList);
      }).catch(error => {
        reject(error);
      });
    });
  }

  private filterPatients(pts: Patient[], filter: PatientListFilterEnum): Patient[] {
    let fpts: Patient[];
    switch (filter) {
      case PatientListFilterEnum.NotScheduled:
        fpts = pts.filter(pt => this.ptSvc.notScheduled(pt));
        break;
      case PatientListFilterEnum.ScheduledBiopsy:
        fpts = pts.filter(pt => this.ptSvc.scheduledForBiopsy(pt));
        break;
      case PatientListFilterEnum.ScheduledSurgery:
        fpts = pts.filter(pt => this.ptSvc.scheduledForSurgery(pt));
        break;
      default: 
        fpts = [];
    }

    return fpts;
  }

  private getWatchedPatients(pts: Patient[], watcherUsername: string): Patient[] {
    return pts.filter(pt => pt.watchers.indexOf(watcherUsername) != -1);
  }

  private sortPatients(pts: Patient[], sort: PatientListSortEnum): Patient[] {
    let spts: Patient[];
    switch (sort) {
      case PatientListSortEnum.NameAsc:
        spts = pts.sort((a, b) => this.cmpPatientsByName(a, b));
        break;
      case PatientListSortEnum.NameDesc:
        spts = pts.sort((a, b) => -this.cmpPatientsByName(a, b));
        break;
      case PatientListSortEnum.DateEditedDesc:
        spts = pts.sort((a, b) => this.cmpPatientsByDateEditedDesc(a, b));
        break;
      case PatientListSortEnum.SurgeryDateAsc:
        spts = pts.sort((a, b) => this.cmpPatientsBySurgeryDate(a, b));
        break;
      case PatientListSortEnum.SurgeryDateDesc:
        spts = pts.sort((a, b) => -this.cmpPatientsBySurgeryDate(a, b));
        break;
      case PatientListSortEnum.DateAddedDesc:
        // reverse the default sort order
        spts = pts.reverse();
    }
    return spts;
  }

  private cmpPatientsByName(a: Patient, b: Patient): number {
    let cmp: number = 0;
    if (a.lastName > b.lastName) {
      cmp = 1;
    }
    else if (a.lastName < b.lastName) {
      cmp = -1
    }
    else {
      if (a.firstName > b.firstName) {
        cmp = 1;
      }
      else if (a.firstName < b.firstName) {
        cmp = -1;
      }
    }
    return cmp;
  }

  private cmpPatientsByDateEditedDesc(a: Patient, b: Patient): number {
    let cmp: number = 0;
    if (a.editedDate > b.editedDate) {
      cmp = -1;
    }
    else if (a.editedDate < b.editedDate) {
      cmp = 1;
    }
    return cmp;
  }

  private cmpPatientsBySurgeryDate(a: Patient, b: Patient): number {
    let cmp: number = 0;
    let aSurgeryDate: string = this.getSurgeryDate(a);
    let bSurgeryDate: string = this.getSurgeryDate(b);
    if (aSurgeryDate > bSurgeryDate) {
      cmp = 1;
    }
    else if (aSurgeryDate < bSurgeryDate) {
      cmp = -1;
    }
    return cmp;
  }

  private getSurgeryDate(pt: Patient): string {
    let surgeryDate: string = '';
    if (pt.surgery != null) {
      if (pt.surgery.scheduledSurgery != null) {
        surgeryDate = pt.surgery.scheduledSurgery.scheduledDate;
      }
      else if (pt.surgery.completedSurgeries != null) {
        surgeryDate = pt.surgery.completedSurgeries[
          pt.surgery.completedSurgeries.length - 1].surgeryDate;
      }
    }
    return surgeryDate;
  }
}

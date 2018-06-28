import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BiopsyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BiopsyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BiopsyProvider Provider');
  }

  getBiopsy(biopsyId: string) {
    return '';
  }

  updateStatus(biopsyId: string, status: string) {

  }

  updateReportPage1(procedureDate: Date, reportDate: Date, hospital: string, pathologist: string) {

  }
}

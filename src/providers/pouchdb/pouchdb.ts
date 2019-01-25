import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Patient } from '../../models/patient';
import UUID from 'uuid';
/*
  Generated class for the PouchdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PouchdbProvider {
  db = null;

  constructor(public http: HttpClient) {
    this.db = new PouchDB('oncdeck');

    console.log('Hello PouchdbProvider Provider');
  }

  getDb(): any {
    return this.db;
  }

  savePatient(patient: Patient): Promise<any> {
    // create a unique id for patient
    if (patient._id == null) {
      patient._id = UUID.v4();
    }
    return new Promise((resolve, reject) => {
      this.db.put(patient).then(function (response) {
        resolve(patient);
      }).catch(function (err) {
        reject(err);
      });
    });
  }

  getPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this.db.allDocs({include_docs: true}).then(result => {
        let patients: Patient[] = [];
        for (var i = 0; i < result.total_rows; i++) {
          let patient: Patient = result.rows[i].doc;
          patients.push(patient);
        }
        resolve(patients);
      }).
      catch(error => {
        reject(error);
      });
    });
  }
}

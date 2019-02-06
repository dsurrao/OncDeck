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
  remoteDb = null; 

  constructor(public http: HttpClient) {
    this.db = new PouchDB('oncdeck');

    //this.remoteDb = new PouchDB('http://127.0.0.1:5984/oncdeck');

    // IBM cloud instance
    this.remoteDb = new PouchDB(
      'https://89ca2ae2-6aed-490c-8ba7-4a8897cbedf7-bluemix.cloudant.com/oncdeck',
        {auth: {username: 'terrentypticilikedinglel', password: 'b22ff6beeab8954e123783d1a85675b0553f307d'}});

    // live sync dbs
    this.syncDbs();

    console.log('Hello PouchdbProvider Provider');
  }

  getDb(): any {
    return this.db;
  }

  savePatient(patient: Patient): Promise<Patient> {
    // create a unique id for patient
    if (patient._id == null) {
      patient._id = UUID.v4();
    }
    return new Promise((resolve, reject) => {
      this.db.put(patient).then(function (response) {
          patient._rev = response.rev;
          resolve(patient);
        }.bind(this)
      ).catch(function (err) {
        reject(err);
      });
    });
  }

  removePatient(patient: Patient): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.remove(patient._id, patient._rev).then(function (response) {
          resolve(true);
        }.bind(this)
      ).catch(function (err) {
        reject(false);
      });
    });
  }

  // try to sync with remote db to get the latest, otherwise use local db
  getPatients(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this.db.sync(this.remoteDb)
      .on('complete', function () {
        resolve(this.getPatientsLocal());
      }.bind(this))
      .on('error', function (err) {
        resolve(this.getPatientsLocal());
      }.bind(this));
    });
  }

  getPatientsLocal(): Promise<Patient[]> {
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

  syncDbs() {
    this.db.sync(this.remoteDb, {
      live: true,
      retry: true
    }).on('change', function (change) {
      // yo, something changed!
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function (info) {
      // replication was resumed
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
    });
    
    // this.db.sync(this.remoteDb).on('complete', function () {
    //   console.log("// yay, we're in sync!");
    // }).on('error', function (err) {
    //   console.log("// boo, we hit an error! " + err);
    // });
  }
}

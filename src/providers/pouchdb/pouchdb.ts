import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Patient } from '../../models/patient';
import UUID from 'uuid';
import { Device } from '@ionic-native/device';
import { Events, Platform } from 'ionic-angular';
/*
  Generated class for the PouchdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PouchdbProvider {
  db = null;
  remoteDb = null; 

  constructor(public http: HttpClient, 
    public device: Device,
    public platform: Platform,
    public events: Events) {
    this.db = new PouchDB('oncdeck');

    //this.remoteDb = new PouchDB('http://127.0.0.1:5984/oncdeck');

    // IBM cloud instance
    let _username: string = 'terrentypticilikedinglel';
    let _password: string = 'b22ff6beeab8954e123783d1a85675b0553f307d';

    this.remoteDb = new PouchDB(
      'https://89ca2ae2-6aed-490c-8ba7-4a8897cbedf7-bluemix.cloudant.com/oncdeck',
        {auth: {username: _username, password: _password}});

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
    // execute only if this is a mobile device
    if (!this.platform.is('core')) {
      if (this.device.uuid != null) {
        patient.editorDeviceUuid = this.device.uuid;
      }
    }
    patient.editedDate = new Date();
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

  removePatient(patient: Patient): Promise<Patient> {
    patient.isArchived = true;
    return this.savePatient(patient);
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
          if (patient.lastName != null) {
            patients.push(patient);
          }
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
      console.log('sync change');
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log('sync paused');
    }).on('active', function (info) {
      // replication was resumed
      this.events.publish('syncActive');
      console.log('sync active');
    }.bind(this))
    .on('denied', function (info) {
      // a document failed to replicate (e.g. due to permissions)
      console.log('sync denied');
    }).on('complete', function (info) {
      // handle complete
      console.log('sync complete');
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log('sync error');
    });
    
    // this.db.sync(this.remoteDb).on('complete', function () {
    //   console.log("// yay, we're in sync!");
    // }).on('error', function (err) {
    //   console.log("// boo, we hit an error! " + err);
    // });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { Device } from '@ionic-native/device/ngx';
import { Events, Platform } from '@ionic/angular';
import PouchDB from 'pouchdb';
import PouchDBAuth from 'pouchdb-authentication';
import PouchDBFind from 'pouchdb-find';
import { PatientList } from '../models/patient-list';
import { DateUtils } from '../common/dateutils';

PouchDB.plugin(PouchDBAuth);
PouchDB.plugin(PouchDBFind);
//PouchDB.plugin(require('pouchdb-authentication'));

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {

  db: any = null;
  remoteDb = null; 

  constructor(public http: HttpClient, 
    public device: Device,
    public platform: Platform,
    public events: Events,
    public dateUtils: DateUtils) {
    this.db = new PouchDB('oncdeck', {auto_compaction: true});

    // Local CouchDB instance
    // let _username: string = 'dom';
    // let _password: string = 'letdomin';
    // this.remoteDb = new PouchDB('http://127.0.0.1:5984/oncdeck',
    //   {auth: {username: _username, password: _password}});

    // Local CouchDB instance
    // this.remoteDb = new PouchDB('http://127.0.0.1:5984/oncdeck-dev', {
    //   fetch: function (url, opts) {
    //     opts.credentials='include';
    //     return PouchDB.fetch(url, opts);
    //   }
    // });

    // IBM cloud instance oncdeck, without accounts
    let _username: string = 'terrentypticilikedinglel';
    let _password: string = 'b22ff6beeab8954e123783d1a85675b0553f307d';
    this.remoteDb = new PouchDB(
      'https://89ca2ae2-6aed-490c-8ba7-4a8897cbedf7-bluemix.cloudant.com/oncdeck',
        {auth: {username: _username, password: _password}});

    // IBM cloud instance oncdeck-dev, without accounts
    // pass in logged in credentials (opts.credentials)
    // this.remoteDb = new PouchDB('https://89ca2ae2-6aed-490c-8ba7-4a8897cbedf7-bluemix.cloudant.com/oncdeck-dev', {
    //   fetch: function (url, opts) {
    //     opts.credentials='include';
    //     return PouchDB.fetch(url, opts);
    //   }
    // });

    // live sync dbs
    this.syncDbs();
  }

  getDb(): any {
    return this.db;
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.remoteDb.logIn(username, password).then((response) => {
        // live sync dbs on login
        this.syncDbs();
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.remoteDb.logOut().then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  getSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.remoteDb.getSession().then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  getSessionUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      let username: string = '';
      this.getSession().then((response) => {
        if (response.userCtx.name) {
          username = response.userCtx.name;
        }
        resolve(username);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  getSessionRoles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let roles: string[] = [];
      this.getSession().then((response) => {
        if (response.userCtx.roles) {
          roles = response.userCtx.roles;
        }
        resolve(roles);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  getDocument(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(id).then(function(doc) {
          resolve(doc);
        }.bind(this)
      )
      .catch((error) => {
        console.log(error);
      });
    });
  }

  savePatient(patient: Patient): Promise<Patient> {
    return new Promise((resolve, reject) => {
      // create a unique id for patient
      if (patient._id == null) {
        patient._id = this.dateUtils.generateUniqueId();
      }
      // execute only if this is a mobile device
      if (this.platform.is('ios') || this.platform.is('android')) {
        if (this.device.uuid != null) {
          patient.editorDeviceUuid = this.device.uuid;
        }
      }
      this.getSessionUsername().then((username) => {
        patient.editorUsername = username;
      })
      .catch((error) => {
        console.log(error);
      });
      patient.editedDate = new Date().toISOString();
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
  getPatients(args: object = {}): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      this.db.sync(this.remoteDb)
      .on('complete', function () {
        resolve(this.getPatientsLocal(args));
      }.bind(this))
      .on('error', function (err) {
        resolve(this.getPatientsLocal(args));
      }.bind(this));
    });
  }

  getPatientsLocal(args): Promise<PatientList> {
    return new Promise((resolve, reject) => {
      args.include_docs = true;
      // return more recent documents first, doc ids are sorted
      // lexicographically: https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
      args.descending = true; 
      this.db.allDocs(args).then(result => {
        let list: PatientList = new PatientList();
        list.patients = [];
        list.totalRows = result.total_rows;
        for (var i = 0; i < result.rows.length; i++) {
          let patient: Patient = result.rows[i].doc;
          if (patient.lastName != null) {
            list.patients.push(patient);
          }
        }
        resolve(list);
      }).
      catch(error => {
        reject(error);
      });
    });
  }

  syncDbs() {
    console.log('syncDbs');

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
      console.log('sync error: ' + err);
    });
  }
}

import { PatientFormPage } from './../patient-form/patient-form';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Patient } from '../../models/patient';

import { LoginModal } from '../../modal/login/login';
import { LogoutModal } from '../../modal/logout/logout';
import { PatientPage } from '../patient/patient';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; // specify the location of aws-exports.js file on your project
import AWS from 'aws-sdk';

AWS.config.region = aws_exports.aws_project_region;

/**
 * Generated class for the PatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {
  patients: any;
  userId: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public db: DynamodbProvider,
    public events: Events) {
    this.patients = [];

    this.events.subscribe('userLoggedIn', () => {
      this.getPatients();
    });

    this.events.subscribe('userLoggedOut', () => {
      this.getPatients();
    });
  }

  ionViewDidLoad() {
    this.getPatients();
  }

  getPatients() {
    Auth.currentUserCredentials()
      .then(credentials => {
        this.userId = credentials.identityId;

        const params = {
          TableName: 'Patient'
        };


        this.db.getDocumentClient(credentials).scan(params).promise()
          .then(data => { 
            this.patients = data.Items; 
          })
          .catch(err => console.log('error in refresh tasks', err));
      })
      .catch(err => {
        console.log('get current credentials err', err);
        this.patients = [];
      });
  }

  login() {
    this.loginModal();
  }

  addPatient() {
    Auth.currentAuthenticatedUser().then((user) => {
      this.navCtrl.push(PatientFormPage);
    }).catch((error) => {
      console.log(error);
    });
  }

  viewPatient(data) {
    Auth.currentAuthenticatedUser().then((user) => {
      this.navCtrl.push(PatientPage, {params: data});
    }).catch((error) => {
      console.log(error);
    });
  }

  loginModal () {
    let modal;
    Auth.currentAuthenticatedUser().then((user) => {
      modal = this.modalCtrl.create(LogoutModal);
      modal.present();
    }).catch((error) => {
      modal = this.modalCtrl.create(LoginModal);
      modal.present();
    });
  }

}



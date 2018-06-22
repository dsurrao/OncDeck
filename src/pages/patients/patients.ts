import { PatientFormPage } from './../patient-form/patient-form';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Component, ViewChild } from '@angular/core';
import { AlertController, 
  Events, 
  IonicPage, 
  ModalController, 
  NavController, 
  NavParams, 
  List
} from 'ionic-angular';
import { LoginModal } from '../../modal/login/login';
import { LogoutModal } from '../../modal/logout/logout';
import { PatientPage } from '../patient/patient';

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
  @ViewChild(List) list: List;

  patients: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public db: DynamodbProvider,
    public events: Events) {
    this.patients = [];

    this.events.subscribe('userLoggedIn', () => {
      this.getPatients();
    });

    this.events.subscribe('userLoggedOut', () => {
      this.getPatients();
    });

    this.events.subscribe('patientSaved', () => {
      this.getPatients();
    });
  }

  ionViewDidLoad() {
    this.getPatients();
  }

  getPatients() {
    Auth.currentUserCredentials()
      .then(credentials => {

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

  viewPatient(patient) {
    Auth.currentAuthenticatedUser().then((user) => {
      this.navCtrl.push(PatientPage, {params: patient});
    }).catch((error) => {
      console.log(error);
    });
  }

  removePatient(patient) {
    Auth.currentUserCredentials().then((credentials) => {
      const params = {
        TableName: 'Patient',
        Key: {
          Id: patient['Id']
        }
      };

      this.db.getDocumentClient(credentials).delete(params).promise()
        .then(data => { 
          // refresh patient list
          this.getPatients();
        })
        .catch(err => console.log('error in delete patient', err));
    }).catch((error) => {
      console.log(error);
    });
  }

  removePatientConfirm(patient) {
    const confirm = this.alertCtrl.create({
      title: 'Remove patient?',
      message: 'Are you sure you want to remove this patient?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.removePatient(patient);
          }
        }
      ]
    });
    confirm.present();
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



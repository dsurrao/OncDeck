import { DateUtils } from './../../common/dateutils';
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
  isAuthenticated: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public db: DynamodbProvider,
    public events: Events,
    public dateUtils: DateUtils) {
    this.patients = [];
    this.isAuthenticated = false;

    this.events.subscribe('userLoggedIn', () => {
      this.isAuthenticated = true;
      this.getPatients();
    });

    this.events.subscribe('userLoggedOut', () => {
      this.isAuthenticated = false;
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
            this.patients.sort((a, b)=>{
              let cmp = 0;
              if (a['Surgeries'] != null) {
                if (b['Surgeries'] != null) {
                  if (a['Surgeries'][0]['ScheduledDate'] > b['Surgeries'][0]['ScheduledDate']) {
                    cmp = -1;
                  }
                  else if  (a['Surgeries'][0]['ScheduledDate'] == b['Surgeries'][0]['ScheduledDate']) {
                    cmp = 0;
                  }
                  else {
                    if (a['Surgeries'][0]['CompletedDate'] != null && b['Surgeries'][0]['CompletedDate'] != null) {
                      if (a['Surgeries'][0]['CompletedDate'] > b['Surgeries'][0]['CompletedDate']) {
                        cmp = -1;
                      }
                      else if (a['Surgeries'][0]['CompletedDate'] == b['Surgeries'][0]['CompletedDate']) {
                        cmp = 0;
                      }
                      else {
                        cmp = 1;
                      }
                    }
                    else {
                      cmp = 1;
                    }
                  }
                }
                else {
                  cmp = 1;
                }
              }
              else {
                if (b['Surgeries'] != null) {
                  cmp = -1;
                }
                else {
                  cmp = 0;
                }
              }              
              return (cmp);
            });
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

  // TODO: gets only the first surgery, need to handle multiple
  getSurgerySummary(patient) {
    let surgeryStatus = "Surgery not scheduled";
    let surgeries = patient['Surgeries'] != null ? patient['Surgeries'] : [];
    if (surgeries.length > 0) {
      if (surgeries[0]['CompletedDate'] != null) {
        surgeryStatus = "Surgery completed on " + new Date(surgeries[0]['CompletedDate']).toLocaleDateString()
        + " at " + surgeries[0]['Facility'] + " with " + surgeries[0]['ProviderName'];
      }
      else if (surgeries[0]['ScheduledDate'] != null) {
        surgeryStatus = "Surgery scheduled on " + new Date(surgeries[0]['ScheduledDate']).toLocaleDateString()
        + " at " + surgeries[0]['Facility'] + " with " + surgeries[0]['ProviderName'];
      }
    }
    return (surgeryStatus);
  }

  // returns 
  // 0: not scheduled
  // 1: scheduled today
  // 2: scheduled in the future
  // 3: completed
  // 4: missed
  getSurgeryStatus(patient): number {
    let surgeryStatus = 0;
    let surgeries = patient['Surgeries'] != null ? patient['Surgeries'] : [];
    if (surgeries.length > 0) {
      if (surgeries[0]['CompletedDate'] != null) {
        surgeryStatus = 3;
      }
      else if (surgeries[0]['ScheduledDate'] == null) {
        surgeryStatus = 0;
      }
      else {
        let daysFromToday = this.dateUtils.daysFromToday(surgeries[0]['ScheduledDate']);
        if (daysFromToday == 0) {
          surgeryStatus = 1;
        }
        else if (daysFromToday > 0) {
          surgeryStatus = 2;
        }
        else {
          surgeryStatus = 4;
        }
      }
    }
    return surgeryStatus;
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

  /**
   * Check if ScheduledBiopsyDate is greater or lesser than current date
   */
  isBiopsyAfterCurrentDate(ScheduledBiopsyDate: string) {
    if (ScheduledBiopsyDate == undefined)
      return "";
    else if (ScheduledBiopsyDate > new Date().toISOString())
      return "true"
    else {
      return "false"
    }
  }
}



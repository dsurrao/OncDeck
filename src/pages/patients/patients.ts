import { DateUtils } from './../../common/dateutils';
import { PatientFormPage } from './../patient-form/patient-form';
import { GraphPage } from './../graph/graph';
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
import { PatientProvider } from '../../providers/patient/patient';
import { userInfo } from 'os';
import { AboutPage } from '../about/about';

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
  originalPatientList: any;
  isAuthenticated: boolean;
  currentAuthenticatedUsername: string;
  showOnlyMyPatients: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public patientSvc: PatientProvider,
    public events: Events,
    public dateUtils: DateUtils) {
    this.patients = [];
    this.originalPatientList = [];
    this.isAuthenticated = false;
    this.currentAuthenticatedUsername = '';
    this.showOnlyMyPatients = false;

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
        Auth.currentUserInfo().then((userInfo) => {
          this.currentAuthenticatedUsername = userInfo.username;
          this.isAuthenticated = true;
          this.patientSvc.getPatients(this.showOnlyMyPatients, 
            this.currentAuthenticatedUsername, credentials).then((data) => {
            this.patients = data;
            this.originalPatientList = data; // make a copy of patients for filtering purposes
          })
          .catch((error) => {
            console.log('get patients error', error);
            this.patients = [];
          });
        })
        .catch((error) => {
          this.patients = [];
        });
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

  showGraph() {
    Auth.currentAuthenticatedUser().then((user) => {
      this.navCtrl.push(GraphPage);
    }).catch((error) => {
      console.log(error);
    });
  }

  aboutPage() {
    Auth.currentAuthenticatedUser().then((user) => {
      this.navCtrl.push(AboutPage);
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
      this.patientSvc.removePatient(patient, credentials).then((data) => {
        // refresh patient list
        this.getPatients();
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  watchPatient(patient) {
    Auth.currentUserCredentials().then((credentials) => {
      this.patientSvc.watchPatient(patient['Id'], 
        this.currentAuthenticatedUsername, credentials).then((data) => {
          this.getPatients();
          console.log("watching patient " + patient['LastName']);
        })
        .catch((error) => {
          console.log(error);
        })
    }).catch((error) => {
      console.log(error);
    });

    this.list.closeSlidingItems();
  }

  unWatchPatient(patient) {
    Auth.currentUserCredentials().then((credentials) => {
      this.patientSvc.unWatchPatient(patient['Id'], 
        this.currentAuthenticatedUsername, credentials).then((data) => {
          this.getPatients();
          console.log("unwatching patient " + patient['LastName']);
        })
        .catch((error) => {
          console.log(error);
        });
    }).catch((error) => {
      console.log(error);
    });

    this.list.closeSlidingItems();
  }

  isWatchingPatient(patient): boolean {
    let ret: boolean = false;
    let watchers: Array<string> = [];
    if (patient['Watchers'] != null) {
      watchers = patient['Watchers'].values;
      if (watchers.indexOf(this.currentAuthenticatedUsername) > -1) {
        ret = true;
      }
    }
    return ret;
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
        surgeryStatus = "on " + new Date(surgeries[0]['CompletedDate']).toLocaleDateString()
        + " at " + surgeries[0]['Facility'] + " with " + surgeries[0]['ProviderName'];
      }
      else if (surgeries[0]['ScheduledDate'] != null) {
        surgeryStatus = "on " + new Date(surgeries[0]['ScheduledDate']).toLocaleDateString()
        + " at " + surgeries[0]['Facility'] + " with " + surgeries[0]['ProviderName'];
      }
    }
    return (surgeryStatus);
  }

  getSurgeryStatusText(patient) {
    let surgeries = patient['Surgeries'] != null ? patient['Surgeries'] : [];
    if (surgeries.length > 0) {
      if (surgeries[0]['CompletedDate'] != null)
        return "completed";
      else if (surgeries[0]['ScheduledDate'] != null) {
        return "scheduled";
      }
    }
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

  /**
   * Filter patient list by lastname, firstname
   * @param ev 
   */
  filterPatientList(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.patients = this.originalPatientList.filter(function(item) {
        var fullName = item.LastName.toLowerCase() + ", " + item.FirstName.toLowerCase()
        return fullName.includes(val.toLowerCase());
      });
    }
    else
      this.patients = this.originalPatientList;
  }
  
  /**
   * Sort patient list by lastname depending on sortPreference passed in
   * @param sortPreference
   */
  sortPatientList(sortPreference) {

    var greaterValue, lesserValue;
    if (sortPreference == "ascend") {
      greaterValue = 1
      lesserValue = -1
    }
    else {
      greaterValue = -1;
      lesserValue = 1
    }

    this.patients = this.patients.sort((a, b)=>{
      let cmp = 0;
      if (a['LastName'] > b['LastName']) {
        cmp = greaterValue;
      }
      else if  (a['LastName'] == b['LastName'])  {
        cmp = 0;
      }
      else
        cmp = lesserValue;
      return (cmp);
    });
  }

  togglePatients() {
    this.getPatients();
  }

  /**
   * Filter alert
   */
  doFilter() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filters');

    alert.addInput({
        type: 'radio',
        label: 'Sort Ascending',
        value: 'asc',
        checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Sort Descending',
      value: 'desc'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Confirm',
      handler: (data: any) => {
        if (data == "asc")
          this.sortPatientList('ascend');
        else
          this.sortPatientList('descend');
      }
    });

    alert.present();
  }

}
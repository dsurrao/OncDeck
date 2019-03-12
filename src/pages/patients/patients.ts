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
import { Patient } from '../../models/patient';

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

  patients: Patient[];
  originalPatientList: any;
  isAuthenticated: boolean;
  currentAuthenticatedUsername: string;
  showOnlyMyPatients: boolean;
  showOnlyPatientsWithoutCompletedSurgeries: boolean;
  sortOrder: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public patientSvc: PatientProvider,
    public events: Events,
    public dateUtils: DateUtils) {
    this.patients = [];
    this.originalPatientList = [];
    this.isAuthenticated = true;
    this.currentAuthenticatedUsername = '';
    this.showOnlyMyPatients = false;
    this.showOnlyPatientsWithoutCompletedSurgeries = false;
    this.sortOrder = 'descSurgDate';

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
    this.patientSvc.getPatients(this.showOnlyMyPatients, 
      this.currentAuthenticatedUsername, null).then((data) => {
      this.patients = data;
      this.originalPatientList = data; // make a copy of patients for filtering purposes
      this.displayPatientsBySortOrder(this.sortOrder);
    })
    .catch((error) => {
      console.log('get patients error', error);
      this.patients = [];
    });
  }

  login() {
    this.loginModal();
  }

  addPatient() {
    this.navCtrl.push(PatientFormPage);
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
    this.navCtrl.push(PatientPage, {params: patient});
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

  removePatient(patient) {
    this.patientSvc.removePatient(patient).then((data) => {
      // refresh patient list
      this.getPatients();
    })
  }

/*
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
*/

  // TODO: gets only the first surgery, need to handle multiple
  getSurgerySummary(patient) {
    let surgeryStatus = "Surgery not scheduled";
    let surgeries = patient.surgeries != null ? patient.surgeries : [];
    if (surgeries.length > 0) {
      if (surgeries[0].completedDate != null) {
        surgeryStatus = "on " + new Date(surgeries[0].completedDate).toLocaleDateString()
        + " at " + surgeries[0].facility + " with " + surgeries[0].providerName;
      }
      else if (surgeries[0].scheduledDate != null) {
        surgeryStatus = "on " + new Date(surgeries[0].scheduledDate).toLocaleDateString()
        + " at " + surgeries[0].facility + " with " + surgeries[0].providerName;
      }
    }
    return (surgeryStatus);
  }

  getSurgeryStatusText(patient) {
    let surgeries = patient.surgeries != null ? patient.surgeries : [];
    if (surgeries.length > 0) {
      if (surgeries[0].completedDate != null)
        return "completed";
      else if (surgeries[0].scheduledDate != null) {
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
    let surgeryStatus: number = 0;
    let surgeries = patient.surgeries != null ? patient.surgeries : [];
    if (surgeries.length > 0) {
      if (surgeries[0].completedDate != null) {
        surgeryStatus = 3;
      }
      else if (surgeries[0].scheduledDate == null) {
        surgeryStatus = 0;
      }
      else {
        let daysFromToday = this.dateUtils.daysFromToday(surgeries[0].scheduledDate);
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
        label: 'Sort Ascending By Name',
        value: 'ascName',
        checked: this.sortOrder == 'ascName'
    });

    alert.addInput({
      type: 'radio',
      label: 'Sort Descending By Name',
      value: 'descName',
      checked: this.sortOrder == 'descName'
    });

    alert.addInput({
      type: 'radio',
      label: 'Sort Ascending By Surgery Date',
      value: 'ascSurgDate',
      checked: this.sortOrder == 'ascSurgDate'
    });

    alert.addInput({
      type: 'radio',
      label: 'Sort Descending By Surgery Date',
      value: 'descSurgDate',
      checked: this.sortOrder == 'descSurgDate'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Confirm',
      handler: (sortOrder: string) => {
        this.displayPatientsBySortOrder(sortOrder);
      }
    });

    alert.present();
  }

  displayPatientsBySortOrder(sortOrder) {
    switch(sortOrder) {
      case "ascName":
        this.sortPatientListByName('ascend');
        this.sortOrder = "ascName";
        break;
      case "descName":
        this.sortPatientListByName('descend');
        this.sortOrder = "descName";
        break;
      case "ascSurgDate":
        this.sortPatientListBySurgDate('ascend');
        this.sortOrder = "ascSurgDate";
        break;
      case "descSurgDate":
        this.sortPatientListBySurgDate('descend');
        this.sortOrder = "descSurgDate";
    }
  }

  /**
   * Sort patient list by lastname depending on sortPreference passed in
   * @param sortPreference
   */
  sortPatientListByName(sortPreference) {
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
      if (a['lastName'] > b['lastName']) {
        cmp = greaterValue;
      }
      else if  (a['lastName'] == b['lastName'])  {
        cmp = 0;
      }
      else {
        cmp = lesserValue;
      }
      return (cmp);
    });
  }

  sortPatientListBySurgDate(sortPreference) {
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
      let aSurgSchedDate: string = a['surgeries'] != null ? a['surgeries'][a['surgeries'].length - 1]['scheduledDate'] : '';
      let bSurgSchedDate: string = b['surgeries'] != null ? b['surgeries'][b['surgeries'].length - 1]['scheduledDate'] : '';
      
      if (aSurgSchedDate > bSurgSchedDate) {
        cmp = greaterValue;
      }
      else if  (aSurgSchedDate == bSurgSchedDate)  {
        cmp = 0;
      }
      else {
        cmp = lesserValue;
      }
      return (cmp);
    });
  }

  showPatient(patient: Patient) {
    if (this.showOnlyPatientsWithoutCompletedSurgeries) {
      if (patient['surgeries'] != null) {
        if (patient['surgeries'][patient['surgeries'].length - 1]['completedDate'] != null) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return true;
      }
    }
    return true;
  }
}
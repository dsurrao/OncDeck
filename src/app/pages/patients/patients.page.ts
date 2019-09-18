import { DateUtils } from '../../common/dateutils';
//import { GraphPage } from './../graph/graph';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AlertController, 
  Events, 
  LoadingController,
  ModalController, 
  NavController, 
  Platform,
  IonList
} from '@ionic/angular';
import { LoginModalPage } from '../login-modal/login-modal.page';
import { LogoutModalPage } from '../logout-modal/logout-modal.page';
// import { AboutPage } from '../about/about';
import { Patient } from '../../models/patient';
import { Device } from '@ionic-native/device/ngx';
//import { Printer, PrintOptions }  from '@ionic-native/printer';
import { PatientService } from '../../services/patient.service';
import { PouchdbService } from '../../services/pouchdb.service'
import { SurgeryStatusEnum } from 'src/app/enums/surgery-status-enum';
import { SurgeryNotIndicatedReasonEnum } from 'src/app/enums/surgery-not-indicated-reason-enum';
import { ScheduledSurgery } from 'src/app/models/scheduled-surgery';
import { CompletedSurgery } from 'src/app/models/completed-surgery';
import { PatientListService } from 'src/app/services/patient-list.service';
import { PatientListFilterEnum } from 'src/app/enums/patient-list-filter-enum';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit, OnDestroy {

  @ViewChild('patientList', {read: IonList}) patientList: IonList;

  patients: Patient[] = [];
  originalPatientList: Patient[] = [];
  isAuthenticated: boolean = false;
  currentAuthenticatedUsername: string = '';
  showOnlyMyPatients: boolean = false;
  sortOrder: string = 'lastEditedDate';
  isLoading: boolean = false;
  lastActiveSync: string;
  isSearchbarOpened: boolean = false;
  ptFilter: PatientListFilterEnum = PatientListFilterEnum.All;
  loading: HTMLIonLoadingElement;
  isOnline: boolean = false;
  infiniteScrollFlag: boolean = false;

  // for pagination
  pageSize: number;
  skip: number;
  totalRows: number;
  startKey: string;

  surgeryStatusEnum = SurgeryStatusEnum;
  patientListFilterEnum = PatientListFilterEnum;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public patientSvc: PatientService,
    public patientListSvc: PatientListService,
    public dbService: PouchdbService,
    public events: Events,
    public dateUtils: DateUtils,
    public device: Device,
//    private printer: Printer,
    public platform: Platform) {

    // initialize
    this.resetPaginationOptions();

    // subscribe to events
    this.events.subscribe('userLoggedIn', () => {
      this.isAuthenticated = true;
      this.dbService.getSessionUsername().then((username) => {
        this.currentAuthenticatedUsername = username;
      })
      .catch((error) => {
        console.log('error retrieving session username: ' + error);
      })
      this.getPatients();
    });

    this.events.subscribe('userLoggedOut', () => {
      this.isAuthenticated = false;
      this.currentAuthenticatedUsername = '';
      this.patients = [];
    });

    // TODO: detect which patient was updated and refresh only that one
    this.events.subscribe('patientSaved', () => {
      this.getPatients();
    });

    this.events.subscribe('syncActive', () => {
      this.lastActiveSync = new Date().toLocaleString();
      this.getPatients();
    });
  }

  ngOnInit() {
    this.isOnline = navigator.onLine;

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    window.addEventListener('online', () => {
      this.isOnline = true;
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe('userLoggedIn');
    this.events.unsubscribe('userLoggedOut');
    this.events.unsubscribe('patientSaved');
    this.events.unsubscribe('syncActive');
  }

  ionViewDidEnter() {
    // get current user
    this.dbService.getSession().then((response) => {
      if (response.userCtx.name != '' && response.userCtx.name != null) {
        this.isAuthenticated = true;
        this.currentAuthenticatedUsername = response.userCtx.name;
        this.getPatients();
      }
      else {
        this.isAuthenticated = false;
        if (navigator.onLine) {
          this.presentLoginModal();
        }
        else {
          // get local copy of patients even if not authenticated
          this.getPatients();
        }
      }
    }).catch((error) => {
      // get local copy of patients even if no connectivity
      this.getPatients();
      console.log(error);
    });
  }

  login() {
    if (!this.isAuthenticated) {
      this.presentLoginModal();
    }
    else {
      this.presentLogoutModal();
    }
  }

  async presentLoginModal() {
    const modal = await this.modalCtrl.create({component: LoginModalPage});
    return await modal.present();
  }

  async presentLogoutModal() {
    const modal = await this.modalCtrl.create({component: LogoutModalPage});
    return await modal.present();
  }

  resetPaginationOptions() {
    this.pageSize = 10;
    this.skip = 0;
    this.totalRows = -1;
    this.startKey = null;
    this.patients = [];
  }

  async getPatients() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.loading = await this.loadingCtrl.create({
        message: 'Loading patients...'
      });

      this.loading.present().then(() => {
        this.loadMorePatients(null, this.infiniteScrollFlag);
      });
    }
  }

  loadMorePatients(infiniteScrollEvent: any = null, infiniteScrollFlag: boolean = false) {
    let args: object = {};
    if (infiniteScrollFlag) {
      args = {limit: this.pageSize, startkey: this.startKey, skip: this.skip};
    }

    if (this.showOnlyMyPatients) {
      args['watchingProvider'] = this.currentAuthenticatedUsername;
    }

    if (infiniteScrollEvent == null) {
      this.resetPaginationOptions();
    }

    // TODO: add sorting info
    this.patientListSvc.getPatientsByFilter(this.ptFilter, args).then((data) => {
      this.isLoading = false;
      if (this.loading != null) {
        this.loading.dismiss();
      }      
      if (infiniteScrollEvent != null) {
        infiniteScrollEvent.target.complete();
      }

      if (data.patients.length > 0) {
        this.totalRows = data.totalRows;
        this.startKey = data.patients[data.patients.length - 1]._id;
        this.skip = 1;

        data.patients.forEach(patient => {
          if (!patient.isArchived) {
            this.patients.push(patient);
          }
        });
        this.originalPatientList = data.patients; // make a copy of patients for filtering purposes
        this.displayPatientsBySortOrder();
      }
      
    })
    .catch((error) => {
      this.isLoading = false;
      if (this.loading != null) {
        this.loading.dismiss();
      }
      console.log('get patients error', error);
    });
  }

  showGraph() {
    //this.navCtrl.push(GraphPage);
  }

  aboutPage() {
    //this.navCtrl.push(AboutPage);
  }

  async removePatientConfirm(patient) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove patient?',
      message: 'Are you sure you want to remove this patient?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.patientList.closeSlidingItems();
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
    await confirm.present();
  }

  removePatient(patient: Patient) {
    this.patientSvc.removePatient(patient).then((data) => {
      // refresh patient list
      this.getPatients();
    }).catch((error) => {
      let title: string = 'Error saving patient';
      let subTitle: string = '';
      if (error.status == '409') {
        subTitle = "This patient's data was updated by somewhere else; please refresh data via the home page";
      }
      else {
        subTitle = error;
      }
      this.showAlert(title, subTitle);
    });
  }

  watchPatient(patient: Patient) {
    this.patientSvc.watchPatient(patient, this.currentAuthenticatedUsername).then((data) => {
      this.getPatients();
    })
    .catch((error) => {
      console.log(error);
    })
    this.patientList.closeSlidingItems();
  }

  unWatchPatient(patient: Patient) {
    this.patientSvc.unWatchPatient(patient, this.currentAuthenticatedUsername).then((data) => {
      this.getPatients();
    })
    .catch((error) => {
      console.log(error);
    })
    this.patientList.closeSlidingItems();
  }

  isWatchingPatient(patient: Patient): boolean {
    if (patient.watchers != null) {
      if (patient.watchers.indexOf(this.currentAuthenticatedUsername) != -1) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  getSurgerySummary(patient: Patient): string {
    let summary: string = "";
    let surgeryStatus: SurgeryStatusEnum = this.getSurgeryStatus(patient);
    let scheduledSurgery: ScheduledSurgery;
    summary = "Surgery " + surgeryStatus.toString();

    if (patient.surgery != null) {
      switch (surgeryStatus) {
        case SurgeryStatusEnum.Completed:
          // TODO: sort by date
          let completedSurgery: CompletedSurgery = patient.surgery.completedSurgeries[
            patient.surgery.completedSurgeries.length-1];
          summary += ": " + new Date(completedSurgery.surgeryDate).toLocaleDateString() 
            + " at " + completedSurgery.facility + " with " + completedSurgery.surgeonName;
          break;
        case SurgeryStatusEnum.Scheduled:
          scheduledSurgery = patient.surgery.scheduledSurgery;
          if (scheduledSurgery != null) {
            summary += ": " + scheduledSurgery.type + " on "
              + new Date(scheduledSurgery.scheduledDate).toLocaleDateString() 
              + " at " + scheduledSurgery.facility + " with " + scheduledSurgery.surgeonName;
          }
          break;
        case SurgeryStatusEnum.ScheduledToday:
          scheduledSurgery = patient.surgery.scheduledSurgery;
          summary += ": at " + scheduledSurgery.facility + " with " + scheduledSurgery.surgeonName;
          break;
        case SurgeryStatusEnum.NotScheduled:
          summary + ": " + patient.surgery.surgeryNotScheduled.reason;
          break;
        case SurgeryStatusEnum.NotIndicated:
          if (patient.surgery.surgeryNotIndicated.reason == SurgeryNotIndicatedReasonEnum.Other) {
            summary += ": " + patient.surgery.surgeryNotIndicated.reasonOther;
          }
          else {
            summary += ": " + patient.surgery.surgeryNotIndicated.reason;
          }
          break;
        default:
          summary = SurgeryStatusEnum.NotIndicated;
      }
    }
    
    return summary;
  }

  getSurgeryStatus(patient: Patient): SurgeryStatusEnum {
    let status: SurgeryStatusEnum = SurgeryStatusEnum.NotIndicated;
    if (patient.surgery != null) {
      status = patient.surgery.surgeryStatus;
      if (status == SurgeryStatusEnum.Scheduled && patient.surgery.scheduledSurgery != null) {
        let daysFromToday: number = this.dateUtils.daysFromToday(
          patient.surgery.scheduledSurgery.scheduledDate);
        if (daysFromToday == 0) {
          status = SurgeryStatusEnum.ScheduledToday;
        }
        else if (daysFromToday < 0) {
          status = SurgeryStatusEnum.Missed;
        }
      }
    }
    return status;
  }

  /**
   * For the search bar: Filter patient list by lastname, firstname
   * @param ev 
   */
  filterPatientList(ev: any) {
    const val:string = ev.target.value;

    if (val && val.trim() !== '') {
      this.patients = this.originalPatientList.filter(function(item: Patient) {
        var fullName = item.lastName.toLowerCase() + ", " + item.firstName.toLowerCase();
        return fullName.includes(val.toLowerCase());
      });
    }
    else
      this.patients = this.originalPatientList;
  }

  displayPatientsBySortOrder() {
    switch(this.sortOrder) {
      case "lastEditedDate":
        this.sortPatientListByLastEditedDate();
        break;
      case "ascName":
        this.sortPatientListByName('ascend');
        break;
      case "descName":
        this.sortPatientListByName('descend');
        break;
      case "ascSurgDate":
        this.sortPatientListBySurgDate('ascend');
        break;
      case "descSurgDate":
        this.sortPatientListBySurgDate('descend');
        break;
      case "mostRecentlyCreated":
        break;
    }
  }

  sortPatientListByLastEditedDate() {
    this.patients = this.patients.sort((a, b) => {
      let cmp = 0;
      if (a.editedDate > b.editedDate) cmp = -1
      else if (a.editedDate < b.editedDate) cmp = 1;
      return cmp;
    })
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
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        cmp = greaterValue;
      }
      else if  (a.lastName.toLowerCase() == b.lastName.toLowerCase())  {
        cmp = 0;
      }
      else {
        cmp = lesserValue;
      }
      return (cmp);
    });
  }

  sortPatientListBySurgDate(sortPreference: string) {
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
      let aSurgSchedDate: string = '';
      if (a.surgery != null) {
        if (a.surgery.scheduledSurgery != null) {
          aSurgSchedDate = a.surgery.scheduledSurgery.scheduledDate;
        }
      }
      let bSurgSchedDate: string = '';
      if (b.surgery != null) {
        if (b.surgery.scheduledSurgery != null) {
          bSurgSchedDate = b.surgery.scheduledSurgery.scheduledDate;
        }
      }

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

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertCtrl.create({
      header: titleTxt,
      message: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }

  print(){
    // let options: PrintOptions = {
    //     name: 'MyDocument',
    //     duplex: true,
    //     landscape: true,
    //     grayscale: true
    //   };
    // this.printer.print("Data can be placed here", options);
  }

  onErrorLoad(){
    alert('Error : printing is unavailable on your device ');
  }

  onSuccessPrint(){
    alert("printing done successfully !");
  }

  onErrorPrint(){
    alert("Error while printing !");
  }


}

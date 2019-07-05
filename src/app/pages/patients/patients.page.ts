import { DateUtils } from '../../common/dateutils';
//import { GraphPage } from './../graph/graph';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, 
  Events, 
  LoadingController,
  ModalController, 
  NavController, 
  Platform,
  IonList
//  Loading
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
export class PatientsPage implements OnInit {

  @ViewChild('patientList', {read: IonList}) patientList: IonList;

  patients: Patient[];
  originalPatientList: Patient[];
  isAuthenticated: boolean;
  currentAuthenticatedUsername: string;
  showOnlyMyPatients: boolean;
  showOnlyPatientsWithoutSurgeries: boolean;
  sortOrder: string;
  isLoading: boolean;
  lastActiveSync: string;
  isSearchbarOpened: boolean = false;
  ptFilter: PatientListFilterEnum = PatientListFilterEnum.All

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
    this.patients = [];
    this.originalPatientList = [];
    this.isAuthenticated = false;
    this.currentAuthenticatedUsername = '';
    this.showOnlyMyPatients = false;
    this.showOnlyPatientsWithoutSurgeries = false;
    this.sortOrder = 'descSurgDate';
    this.isLoading = false;
    this.lastActiveSync = null;

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

    this.events.subscribe('patientSaved', () => {
      this.getPatients();
    });

    this.events.subscribe('syncActive', () => {
      this.getPatients();
      this.lastActiveSync = new Date().toLocaleString();
    });

    this.dbService.getSession().then((response) => {
      if (!response.userCtx.name) {
        this.isAuthenticated = false;
      }
      else {
        this.isAuthenticated = true;
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.isAuthenticated) {
      this.presentLoginModal();
    }
    else {
      this.getPatients();
    }
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

  async getPatients() {
    console.log("getPatients");
    
    if (!this.isLoading) {
      let loading = await this.loadingCtrl.create({
        message: 'Loading patients...'
      });

      loading.present().then(() => {
        this.isLoading = true;

        this.patientListSvc.getPatientsByFilter(this.ptFilter).then((data) => {
          this.isLoading = false;
          loading.dismiss();

          this.patients = [];
          data.forEach(patient => {
            if (!patient.isArchived) {
              this.patients.push(patient);
            }
          });
          this.originalPatientList = data; // make a copy of patients for filtering purposes
          this.displayPatientsBySortOrder(this.sortOrder);
        })
        .catch((error) => {
          this.isLoading = false;
          loading.dismiss();

          console.log('get patients error', error);
          this.patients = [];
        });
      });
    }
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
    // execute only if this is a mobile device
    if (this.platform.is('ios') || this.platform.is('android')) {
      if (this.device.uuid != null) {
        this.patientSvc.watchPatient(patient, this.device.uuid).then((data) => {
          this.getPatients();
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
    this.patientList.closeSlidingItems();
  }

  unWatchPatient(patient: Patient) {
    // execute only if this is a mobile device
    if (this.platform.is('ios') || this.platform.is('android')) {
      if (this.device.uuid != null) {
        this.patientSvc.unWatchPatient(patient, this.device.uuid).then((data) => {
          this.getPatients();
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
    this.patientList.closeSlidingItems();
  }

  isWatchingPatient(patient: Patient): boolean {
    // execute only if this is a mobile device
    if (this.platform.is('ios') || this.platform.is('android')) {
      if (this.device.uuid != null) {
        if (patient.watchers != null && patient.watchers.indexOf(this.device.uuid) != -1) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return true; // watch all, if this is running in a browser
      }
    }
    else {
      return true; // watch all, if this is running in a browser
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
          summary += ": " + new Date(scheduledSurgery.scheduledDate).toLocaleDateString() 
            + " at " + scheduledSurgery.facility + " with " + scheduledSurgery.surgeonName;
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
      if (status == SurgeryStatusEnum.Scheduled) {
        let daysFromToday: number = this.dateUtils.daysFromToday(patient.surgery.scheduledSurgery.scheduledDate);
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
   * Filter patient list by lastname, firstname
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

  /**
   * Sort patients
   */
  async doSort() {
    let alert = await this.alertCtrl.create({
      header: 'Sort',
      inputs: [
        {
          type: 'radio',
          label: 'Name (asc)',
          value: 'ascName',
          checked: this.sortOrder == 'ascName'
        },
        {
          type: 'radio',
          label: 'Name (desc)',
          value: 'descName',
          checked: this.sortOrder == 'descName'
        },
        {
          type: 'radio',
          label: 'Sch.Surg (asc)',
          value: 'ascSurgDate',
          checked: this.sortOrder == 'ascSurgDate'
        },
        {
          type: 'radio',
          label: 'Sch.Surg (desc)',
          value: 'descSurgDate',
          checked: this.sortOrder == 'descSurgDate'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: (sortOrder: string) => {
            this.displayPatientsBySortOrder(sortOrder);
          }
        }
      ],
      translucent: true,
      cssClass: 'sort-prompt'
    });

    await alert.present();
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

  showPatient(patient: Patient): boolean {
    let showFlag: boolean = true;

    // filter by patients only for mobile devices
    if (this.platform.is('ios') || this.platform.is('android')) {
      showFlag = this.filterByMyPatients(patient);
    }

    return showFlag;
  }

  filterByMyPatients(patient: Patient): boolean {
    if (this.showOnlyMyPatients) {
      if (patient['watchers'] != null) {
        if (patient['watchers'].length > 0) {
          if (patient['watchers'].indexOf(this.device.uuid) == -1) {
            return false;
          }
          else {
            return true;
          }
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    return true;
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

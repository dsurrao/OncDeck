import { DateUtils } from '../../common/dateutils';
//import { PatientFormPage } from './../patient-form/patient-form';
//import { GraphPage } from './../graph/graph';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, 
  Events, 
  LoadingController,
  ModalController, 
  NavController, 
//  NavParams, 
  Platform,
  IonList
//  List,
//  Loading
} from '@ionic/angular';
import { LoginModalPage } from '../login-modal/login-modal.page';
import { LogoutModalPage } from '../logout-modal/logout-modal.page';
// import { PatientPage } from '../patient/patient';
// import { AboutPage } from '../about/about';
import { Patient } from '../../models/patient';
import { Device } from '@ionic-native/device/ngx';
//import { Printer, PrintOptions }  from '@ionic-native/printer';
import { PatientService } from '../../services/patient.service';
import { PouchdbService } from '../../services/pouchdb.service'
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

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
  showOnlyPatientsWithoutCompletedSurgeries: boolean;
  sortOrder: string;
  isLoading: boolean;
  lastActiveSync: string;
  isSearchbarOpened: boolean = false;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public patientSvc: PatientService,
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
    this.showOnlyPatientsWithoutCompletedSurgeries = false;
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
        this.patientSvc.getPatients().then((data) => {
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

  addPatient() {
    //this.navCtrl.push(PatientFormPage);
  }

  showGraph() {
    //this.navCtrl.push(GraphPage);
  }

  aboutPage() {
    //this.navCtrl.push(AboutPage);
  }

  viewPatient(patient) {
    //this.navCtrl.push(PatientPage, {params: patient});
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

  togglePatients() {
    this.getPatients();
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
          label: 'Asc By Name',
          value: 'ascName',
          checked: this.sortOrder == 'ascName'
        },
        {
          type: 'radio',
          label: 'Desc By Name',
          value: 'descName',
          checked: this.sortOrder == 'descName'
        },
        {
          type: 'radio',
          label: 'Asc By Surgery Date',
          value: 'ascSurgDate',
          checked: this.sortOrder == 'ascSurgDate'
        },
        {
          type: 'radio',
          label: 'Desc By Surgery Date',
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
      let aSurgSchedDate: string = '';
      if (a['surgeries'] != null) {
        aSurgSchedDate = a['surgeries'].length > 0 ? a['surgeries'][a['surgeries'].length - 1]['scheduledDate'] : '';
      }
      let bSurgSchedDate: string = '';
      if (b['surgeries'] != null) {
        aSurgSchedDate = b['surgeries'].length > 0 ? b['surgeries'][b['surgeries'].length - 1]['scheduledDate'] : '';
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
    let showFlag: boolean = this.filterByCompletedSurgeries(patient);

    // filter by patients only for mobile devices
    if (this.platform.is('ios') || this.platform.is('android')) {
      showFlag = this.filterByMyPatients(patient) && showFlag;
    }

//    return showFlag;
    return true;
  }

  filterByCompletedSurgeries(patient: Patient): boolean {
    if (this.showOnlyPatientsWithoutCompletedSurgeries) {
      if (patient['surgeries'] != null) {
        if (patient['surgeries'].length > 0) {
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
      else {
        return true;
      }
    }
    return true;
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

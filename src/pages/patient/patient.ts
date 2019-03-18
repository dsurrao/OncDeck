import { DateUtils } from './../../common/dateutils';
import { ScheduledSurgeryPage } from './../scheduled-surgery/scheduled-surgery';
import { PathologySurgeryPage } from './../pathology-surgery/pathology-surgery';
import { PatientFormPage } from './../patient-form/patient-form';
import { Component, ViewChild } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ModalController, AlertController, List } from 'ionic-angular';
import { SurgicalPathology } from '../../models/surgical-pathology';
import { Surgery } from '../../models/surgery';
import { SurgeryProvider } from '../../providers/surgery/surgery';

/**
 * Generated class for the PatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})
export class PatientPage {
  @ViewChild('surgeryList', {read: List}) surgeryList: List;
  @ViewChild('surgicalPathologyList', {read: List}) surgicalPathologyList: List;

  patient: any;
  pathologies: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
    public dateUtils: DateUtils,
    public surgerySvc: SurgeryProvider) {
    this.patient = this.navParams.data.params;
    // this.patient['Age'] = dateUtils.getAge(this.patient['DOB']);
    this.patient['genderInitial'] = this.getGenderInitial(this.patient['Gender']);
    this.pathologies = this.patient['Pathologies'] != null ? this.patient['Pathologies'] : [];
    this.events.subscribe('patientSaved', () => {
      this.refreshPatient();
    });
  }

  edit() {
    this.navCtrl.push(PatientFormPage, {params: this.patient});
  }

  addScheduledSurgery() {
    this.navCtrl.push(ScheduledSurgeryPage, {params: {patient: this.patient}});
  }

  viewScheduledSurgery(surgery) {
    this.navCtrl.push(ScheduledSurgeryPage, {params: {patient: this.patient, surgery: surgery}});
  }

  addSurgicalPathology() {
    this.navCtrl.push(PathologySurgeryPage, {params: {patient: this.patient}});
  }

  viewSurgicalPathology(pathology: SurgicalPathology) {
    this.navCtrl.push(PathologySurgeryPage, {params: {patient: this.patient, surgicalPathology: pathology}});
  }
  
  refreshPatient() {
    
  }

  removeSurgeryConfirm(surgery: Surgery) {
    const confirm = this.alertCtrl.create({
      title: 'Remove surgery entry?',
      message: 'Are you sure you want to remove this surgery entry?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.surgeryList.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.surgeryList.closeSlidingItems();
            this.removeSurgery(surgery);
          }
        }
      ]
    });
    confirm.present();
  }

  removeSurgery(surgery: Surgery) {
    this.surgerySvc.removeSurgery(surgery, this.patient).then((patient) => {
      // do nothing
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

  removeSurgicalPathologyConfirm(pathology: SurgicalPathology) {
    const confirm = this.alertCtrl.create({
      title: 'Remove surgical pathology report?',
      message: 'Are you sure you want to remove this surgical pathology report?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.surgicalPathologyList.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.surgicalPathologyList.closeSlidingItems();
            this.removeSurgicalPathology(pathology);
          }
        }
      ]
    });
    confirm.present();
  }

  removeSurgicalPathology(pathology: SurgicalPathology) {
    this.surgerySvc.removeSurgicalPathology(pathology, this.patient).then((patient) => {
      // do nothing
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

  toLocaleDateString(isoString: string): string {
    return new Date(isoString).toLocaleDateString();
  }
  
  getGenderInitial(gender: String): string {
    let genderInitial = 'U';
    if (gender != null) {
      if (gender.toLowerCase() == 'female') {
        genderInitial = 'F';
      }
      else if (gender.toLowerCase() == 'male') {
        genderInitial = 'M';
      }
    }
    return genderInitial;
  }

  showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = this.alertCtrl.create({
      title: titleTxt,
      subTitle: subTitleTxt,
      buttons: ['OK']
    });
    alert.present();
  }
}

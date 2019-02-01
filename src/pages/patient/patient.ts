import { DateUtils } from './../../common/dateutils';
import { ScheduledSurgeryPage } from './../scheduled-surgery/scheduled-surgery';
import { PathologySurgeryPage } from './../pathology-surgery/pathology-surgery';
import { BiopsyStatusPage } from './../biopsy-status/biopsy-status';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { PatientFormPage } from './../patient-form/patient-form';
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SurgicalPathology } from '../../models/surgical-pathology';

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
  patient: any;
  pathologies: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public db: DynamodbProvider,
    public events: Events,
    public dateUtils: DateUtils) {
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
}

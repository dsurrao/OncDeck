import { DateUtils } from './../../common/dateutils';
import { ScheduledSurgeryPage } from './../scheduled-surgery/scheduled-surgery';
import { PathologySurgeryPage } from './../pathology-surgery/pathology-surgery';
import { BiopsyStatusPage } from './../biopsy-status/biopsy-status';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { PatientFormPage } from './../patient-form/patient-form';
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';

AWS.config.region = aws_exports.aws_project_region;

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
  surgeries: any;
  pathologies: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public db: DynamodbProvider,
    public events: Events,
    public dateUtils: DateUtils) {
    this.patient = this.navParams.data.params;
    this.patient['Age'] = dateUtils.getAge(this.patient['DOB']);
    this.patient['GenderInitial'] = this.getGenderInitial(this.patient['Gender']);
    this.surgeries = this.patient['Surgeries'] != null ? this.patient['Surgeries'] : [];
    this.pathologies = this.patient['Pathologies'] != null ? this.patient['Pathologies'] : [];
    this.events.subscribe('patientSaved', () => {
      this.refreshPatient();
    });
  }

  edit() {
    this.navCtrl.push(PatientFormPage, {params: this.patient});
  }

  editBiopsy() {
    this.navCtrl.push(BiopsyStatusPage, {params: this.patient});
  }

  addScheduledSurgery() {
    this.navCtrl.push(ScheduledSurgeryPage, {params: {patient: this.patient}});
  }

  viewSurgery(surgery) {
    this.navCtrl.push(ScheduledSurgeryPage, {params: {patient: this.patient, surgery: surgery}});
  }

  addPathologySurgery() {
    this.navCtrl.push(PathologySurgeryPage, {params: {patient: this.patient}});
  }

  viewPathologySurgery(pathology) {
    this.navCtrl.push(PathologySurgeryPage, {params: {patient: this.patient, pathology: pathology}});
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

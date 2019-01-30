import { Component } from '@angular/core';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';
import { PatientProvider } from '../../providers/patient/patient';
import { Patient } from '../../models/patient';
import { BiopsyStatusPage } from '../biopsy-status/biopsy-status';

AWS.config.region = aws_exports.aws_project_region;

/**
 * Generated class for the PatientFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
})
export class PatientFormPage {
  patient: Patient;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DynamodbProvider,
    public patientSvc: PatientProvider,
    public events: Events) {
    this.patient = this.navParams.data.params;
    if (this.patient == null) {
      this.patient = new Patient();
      this.patient._id = UUID.v4();
    }
  }

  submit() {
    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      console.log("patient saved");
      this.events.publish('patientSaved');
      this.navCtrl.push(BiopsyStatusPage, {params: updatedPatient});
    })
    .catch(error => {
      console.log("patient save error: " + error);
    });
  }
}

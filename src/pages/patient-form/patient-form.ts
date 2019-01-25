import { Component } from '@angular/core';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid';
import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';
import { PatientProvider } from '../../providers/patient/patient';
import { Patient } from '../../models/patient';

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
  patientId: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  phoneNumber: string;
  ctFirstName: string;
  ctLastName: string;
  biopsyStatus: string;
  patient: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DynamodbProvider,
    public patientSvc: PatientProvider,
    public events: Events) {
    }
  
  ionViewDidLoad() {
    this.patient = this.navParams.data.params;
    if (this.patient != null) {
      this.patientId = this.patient['Id'];
      this.firstName = this.patient['FirstName'];
      this.lastName = this.patient['LastName'];
      this.dob = this.patient['DOB'];
      this.gender = this.patient['Gender'];
      this.phoneNumber = this.patient['PhoneNumber'];
      this.ctFirstName = this.patient['CtFirstName'];
      this.ctLastName = this.patient['CtLastName'];
      this.biopsyStatus = this.patient['BiopsyStatus'];
    }
    else {
      this.patientId = UUID.v4();
    }
  }

  submit() {
    let patient: Patient = new Patient();
    patient.lastName = this.lastName;
    patient.firstName = this.firstName;
    patient.gender = this.gender;
    patient.dob = this.dob;
    this.patientSvc.savePatient(patient).then(result => {
      console.log("patient saved");
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    })
    .catch(error => {
      console.log("patient save error: " + error);
    });
  }
}

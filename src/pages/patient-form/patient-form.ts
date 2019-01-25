import { Component } from '@angular/core';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid';
import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';
import { PatientProvider } from '../../providers/patient/patient';

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
    public patientProvider: PatientProvider,
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
    Auth.currentUserCredentials().then(credentials => {
        // this.patientProvider.savePatient(this.patientId, 
        //   this.firstName, 
        //   this.lastName, 
        //   this.dob, 
        //   this.gender,
        //   this.phoneNumber, 
        //   this.ctFirstName,
        //   this.ctLastName,
        //   this.biopsyStatus).then((resp) => {
        //     this.events.publish('patientSaved');
        //     this.navCtrl.pop();
        //   });
        // 
      });
  }
}

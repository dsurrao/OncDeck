import { Component } from '@angular/core';
import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid'

import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';

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
    public events: Events) {
  }

  ionViewDidLoad() {
    this.patient = this.navParams.data.params;
    if (this.patient != null) {
      this.patientId = this.patient['Id'];
      this.firstName = this.patient['FirstName'];
      this.lastName = this.patient['LastName'];
      this.dob = this.patient['DOB']
      this.gender = this.patient['Gender']
      this.phoneNumber = this.patient['PhoneNumber']
      this.ctFirstName = this.patient['CtFirstName']
      this.ctLastName = this.patient['CtLastName']
      this.biopsyStatus = this.patient['BiopsyStatus'];
    }
    else {
      this.patientId = UUID.v4();
    }
  }

  submit() {
    Auth.currentUserCredentials()
      .then(credentials => {
        if (this.patient == null) {
          const params = {
            TableName: 'Patient',
            Item: {
              LastName: this.lastName,
              FirstName: this.firstName,
              BiopsyStatus: this.biopsyStatus,
              DOB: this.dob,
              Gender: this.gender,
              PhoneNumber: this.phoneNumber,
              Id: this.patientId,
              CtFirstName: this.ctFirstName,
              CtLastName: this.ctLastName
            }
          };

          this.db.getDocumentClient(credentials).put(params).promise()
            .then(data => { 
              console.log(data);
              this.events.publish('patientSaved');
              this.navCtrl.pop();
            })
            .catch(err => console.log('error in save patient', err));
        }
        else {
          const params = {
            TableName: 'Patient',
            Key: {
              Id: this.patientId
            },
            ExpressionAttributeNames: this.constructExpressionAttributeNames(), 
            ExpressionAttributeValues: this.constructExpressionAttributeValues(), 
            UpdateExpression: this.constructUpdateExpression()
          };

          this.db.getDocumentClient(credentials).update(params).promise()
            .then(data => { 
              console.log(data);
              this.events.publish('patientSaved');
              this.navCtrl.pop();
            })
            .catch(err => console.log('error in save patient', err));
        }
      })
      .catch(err => {
        console.log('get current credentials err', err);
      });
  }

  constructExpressionAttributeNames(): any {
    let names = {};
     if (this.lastName != null)     names['#l'] = 'LastName';
     if (this.firstName != null)    names['#f'] = 'FirstName';
     if (this.biopsyStatus != null) names['#b'] = 'BiopsyStatus';
     if (this.dob != null)          names['#d'] = 'DOB';
     if (this.gender != null)       names['#g'] = 'Gender';
     if (this.phoneNumber != null)  names['#p'] = 'PhoneNumber';
     if (this.ctFirstName != null)  names['#c'] = 'CtFirstName';
     if (this.ctLastName != null)   names['#t'] = 'CtLastName';
     return names;
  }

  constructExpressionAttributeValues(): any {
    let values = {};
    if (this.lastName != null)     values[':l'] = this.lastName;
    if (this.firstName != null)    values[':f'] = this.firstName;
    if (this.biopsyStatus != null) values[':b'] = this.biopsyStatus;
    if (this.dob != null)          values[':d'] = this.dob;
    if (this.gender != null)       values[':g'] = this.gender;
    if (this.phoneNumber != null)  values[':p'] = this.phoneNumber;
    if (this.ctFirstName != null)  values[':c'] = this.ctFirstName;
    if (this.ctLastName != null)   values[':t'] = this.ctLastName;
    return values;
  }

  constructUpdateExpression(): string {
    let ex: string = 'SET ';
    if (this.lastName != null)     ex += '#l = :l,';
    if (this.firstName != null)    ex += '#f = :f,';
    if (this.biopsyStatus != null) ex += '#b = :b,';
    if (this.dob != null)          ex += '#d = :d,';
    if (this.gender != null)       ex += '#g = :g,';
    if (this.phoneNumber != null)  ex += '#p = :p,';
    if (this.ctFirstName != null)  ex += '#c = :c,';
    if (this.ctLastName != null)   ex += '#t = :t,';
    ex = ex.replace(new RegExp('[,]$'), ''); // strip out last comma
    return ex;
  }
}

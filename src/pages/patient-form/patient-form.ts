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
              Id: this.patientId
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
            ExpressionAttributeNames: {
              '#l': 'LastName',
              '#f': 'FirstName',
              '#b': 'BiopsyStatus'
             }, 
            ExpressionAttributeValues: {
              ':l': this.lastName,
              ':f': this.firstName,
              ':b': this.biopsyStatus
            }, 
            UpdateExpression: 'SET #l = :l, #f = :f, #b = :b'
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
}

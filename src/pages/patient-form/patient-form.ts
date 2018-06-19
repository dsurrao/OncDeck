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
  userId: string;
  firstName: string;
  lastName: string;
  biopsyStatus: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DynamodbProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientFormPage');
  }

  submit() {
    Auth.currentUserCredentials()
      .then(credentials => {
        this.userId = credentials.identityId;

        const params = {
          TableName: 'Patient',
          Item: {
            LastName: this.lastName,
            FirstName: this.firstName,
            BiopsyStatus: this.biopsyStatus,
            Id: UUID.v4()
          }
        };

        this.db.getDocumentClient(credentials).put(params).promise()
          .then(data => { 
            console.log(data);
            this.events.publish('patientSaved');
            this.navCtrl.pop();
          })
          .catch(err => console.log('error in save patient', err));
      })
      .catch(err => {
        console.log('get current credentials err', err);
      });
  }

}

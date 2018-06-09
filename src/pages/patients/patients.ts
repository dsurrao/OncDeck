import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Patient } from '../../models/patient';

import { LoginModal } from '../../modal/login/login'
import { LogoutModal } from '../../modal/logout/logout'
import { PatientPage } from '../patient/patient';

import { Auth } from 'aws-amplify';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import Amplify from 'aws-amplify';

import AWS from 'aws-sdk';

AWS.config.region = 'us-east-1';

Amplify.configure({
  Auth: {
  // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:9383dd44-c7b3-4e83-8c86-35a139c37e5a', 
  // REQUIRED - Amazon Cognito Region
      region: 'us-east-1', 
  // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_wFoHGe664',
  // OPTIONAL - Amazon Cognito Web Client ID
      userPoolWebClientId: '2jv6fu7cbbcdh0d38ttjfi5s60', 


  }
});

/**
 * Generated class for the PatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {
  patients: any;
  userId: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public db: DynamodbProvider) {
    this.patients = [];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientsPage');

    this.getPatients();
  }

  getPatients() {
    Auth.currentCredentials()
      .then(credentials => {
        this.userId = credentials.identityId;

        const params = {
          TableName: 'Patient'
        };


        this.db.getDocumentClient(credentials).scan(params).promise()
          .then(data => { 
            this.patients = data.Items; 
          })
          .catch(err => console.log('error in refresh tasks', err));

        // this.db.getDocumentClient(credentials)
        //   .then(client => (client as DocumentClient).scan(params).promise())
        //   .then(data => { this.patients = data.Items; })
        //   .catch(err => console.log('error in refresh tasks', err));
      })
      .catch(err => console.log('get current credentials err', err));
  }

  addPatient() {
    this.openModal();
  }

  viewPatient(data) {
    // if (this.auth.isUserSignedIn()) {
    //   this.navCtrl.push(PatientPage);
    // }
    // else {
    //   this.openModal();
    // }
  }

  openModal () {
    //let modal = this.modalCtrl.create(this.auth.isUserSignedIn() ? LogoutModal : LoginModal)
    let modal = this.modalCtrl.create(LoginModal)
    modal.present();
  }

}



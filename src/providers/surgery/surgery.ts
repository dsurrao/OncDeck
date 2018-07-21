import { DynamodbProvider } from '../dynamodb/dynamodb';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';

AWS.config.region = aws_exports.aws_project_region;

/*
  Generated class for the SurgeryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SurgeryProvider {

  constructor(public http: HttpClient, public db: DynamodbProvider) {
    console.log('Hello SurgeryProvider Provider');
  }

  // this.surgerySvc.schedule(this.patient, this.surgery, this.scheduledDate, this.facility, this.providerName).then((resp) => {
  //   this.navCtrl.push(PatientPage, {params: this.patient});
  // });

  /* save scheduled surgery info for a patient */
  schedule(patient: any, surgery: any, scheduledDate: Date, facility: string, providerName, completedDate: Date): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Auth.currentUserCredentials().then(
        credentials => {
          let params = {
            TableName: 'Patient',
            Key: {
              Id: patient['Id']
            },
            ExpressionAttributeNames: {
              '#s': 'Surgeries'
              }, 
            ExpressionAttributeValues: {
              ':s': [{"Facility": facility, "ScheduledDate": scheduledDate, "ProviderName": providerName, "CompletedDate": completedDate}]
            }, 
            UpdateExpression: 'SET #s = :s'
          };
          resolve(this.db.getDocumentClient(credentials).update(params).promise());
        }
      )
      .catch(err => {
        console.log('get current credentials err', err);
        reject('get current credentials err');
      });
    });
    return promise;
  }
}

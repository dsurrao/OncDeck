import { DynamodbProvider } from '../dynamodb/dynamodb';
import { DateUtils } from './../../common/dateutils';
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

  constructor(public http: HttpClient, 
    public db: DynamodbProvider,
    public dateUtils: DateUtils) {
    console.log('Hello SurgeryProvider Provider');
  }

  /* 
    save scheduled surgery info for a patient 
    scheduledDate: yyyy-mm-dd
    completedDate: yyyy-mm-dd
  */
  schedule(patient: any, surgery: any, scheduledDate: string, facility: string, providerName, 
    completedDate: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Auth.currentUserCredentials().then(
        credentials => {
          let scheduledDateISO: string = this.dateUtils.yyyymmddToISOString(scheduledDate);
          let completedDateISO: string = this.dateUtils.yyyymmddToISOString(completedDate);
          let attrValues = [{'Facility': facility, 'ScheduledDate': scheduledDateISO, 'ProviderName': providerName}];
          if (completedDateISO != '') {
            attrValues[0]['CompletedDate'] = completedDateISO;
          }
          let params = {
            TableName: 'Patient',
            Key: {
              Id: patient['Id']
            },
            ExpressionAttributeNames: {
              '#s': 'Surgeries'
              }, 
            ExpressionAttributeValues: {
              ':s': attrValues
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

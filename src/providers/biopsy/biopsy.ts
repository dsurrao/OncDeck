import { DynamodbProvider } from './../../providers/dynamodb/dynamodb';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';

AWS.config.region = aws_exports.aws_project_region;

/*
  Generated class for the BiopsyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BiopsyProvider {
  constructor(public http: HttpClient, public db: DynamodbProvider) {
    console.log('Hello BiopsyProvider Provider');
  }

  getBiopsy(biopsyId: string) {
    return '';
  }

  updateStatus(patientId: string, status: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Auth.currentUserCredentials()
      .then(credentials => {
        const params = {
          TableName: 'Patient',
          Key: {
            Id: patientId
          },
          ExpressionAttributeNames: {
            '#b': 'BiopsyStatus'
            }, 
          ExpressionAttributeValues: {
            ':b': status
          }, 
          UpdateExpression: 'SET #b = :b'
        };

        resolve(this.db.getDocumentClient(credentials).update(params).promise());
      })
      .catch(err => {
        console.log('get current credentials err', err);
        reject('get current credentials err');
      });
    });
    return promise;
  }

  updateReportPage1(procedureDate: Date, reportDate: Date, hospital: string, pathologist: string) {

  }
}

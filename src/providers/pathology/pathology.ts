import { DynamodbProvider } from '../dynamodb/dynamodb';
import { DateUtils } from './../../common/dateutils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';
import awsmobile from '../../assets/aws-exports';

AWS.config.region = awsmobile.aws_project_region;

/*
  Generated class for the PathologySurgery.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PathologySurgery {

  constructor(public http: HttpClient, 
    public db: DynamodbProvider,
    public dateUtils: DateUtils) {
    console.log('Hello PathologySurgery');
  }
  
  /* 
    save pathology surgery info for a patient 
  */
  pathology(patient:any, surgeryType:string, surgeryHistologies:any, surgicalFeatures:string, 
    surgicalMargins:string, estrogrenReceptor:string, progesteroneReceptor:string, heReceptor:string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Auth.currentUserCredentials().then(
        credentials => {
          let attrValues = [{'SurgeryType': surgeryType, 'SurgeryHistology': surgeryHistologies, 'EstrogrenReceptor': estrogrenReceptor, 'ProgesteroneReceptor': progesteroneReceptor, 'HeReceptor': heReceptor, 'SurgicalFeatures': surgicalFeatures, 'SurgicalMargins': surgicalMargins}];
          let params = {
            TableName: awsmobile.aws_resource_name_prefix + '-Patient',
            Key: {
              Id: patient['Id']
            },
            ExpressionAttributeNames: {
              '#p': 'Pathologies'
              }, 
            ExpressionAttributeValues: {
              ':p': attrValues
            }, 
            UpdateExpression: 'SET #p = :p'
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
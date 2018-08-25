import { DynamodbProvider } from './../dynamodb/dynamodb';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

AWS.config.region = aws_exports.aws_project_region;

/*
  Generated class for the PatientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatientProvider {

  constructor(public http: HttpClient,
    public db: DynamodbProvider,
    ) {
    console.log('Hello PatientProvider Provider');
  }

  // pass in credentials from caller, maybe this should be the way to do it?
  /*
  aws dynamodb scan --table-name Patient --filter-expression "contains(Watchers, :w)" \
--expression-attribute-values '{":w": {"S": "dom4"}}'
  */
  getPatients(showOnlyMyPatients: boolean, myUsername: string, credentials: any) {
    return new Promise((resolve, reject) => {
      let patients: any = [];
      let params: any = {
        TableName: 'Patient'
      };

      if (showOnlyMyPatients) {
        params = {
          TableName: 'Patient',
          FilterExpression: 'contains(Watchers, :w)',
          ExpressionAttributeValues: {
            ':w': myUsername
          }
        }
      }

      this.db.getDocumentClient(credentials).scan(params).promise()
        .then(data => {
          patients = data.Items; 
          patients.sort((a, b)=>{
            let cmp = 0;
            if (a['Surgeries'] != null) {
              if (b['Surgeries'] != null) {
                if (a['Surgeries'][0]['ScheduledDate'] > b['Surgeries'][0]['ScheduledDate']) {
                  cmp = -1;
                }
                else if  (a['Surgeries'][0]['ScheduledDate'] == b['Surgeries'][0]['ScheduledDate']) {
                  cmp = 0;
                }
                else {
                  if (a['Surgeries'][0]['CompletedDate'] != null && b['Surgeries'][0]['CompletedDate'] != null) {
                    if (a['Surgeries'][0]['CompletedDate'] > b['Surgeries'][0]['CompletedDate']) {
                      cmp = -1;
                    }
                    else if (a['Surgeries'][0]['CompletedDate'] == b['Surgeries'][0]['CompletedDate']) {
                      cmp = 0;
                    }
                    else {
                      cmp = 1;
                    }
                  }
                  else {
                    cmp = 1;
                  }
                }
              }
              else {
                cmp = 1;
              }
            }
            else {
              if (b['Surgeries'] != null) {
                cmp = -1;
              }
              else {
                cmp = 0;
              }
            }              
            return (cmp);
          });

          resolve(patients);
        })
        .catch(err => reject('error in refresh tasks'));
    });
  }

  savePatient(
    patientId: string, 
    firstName: string, 
    lastName: string, 
    dob: Date,
    gender: string,
    phoneNumber: string, 
    ctFirstName: string,
    ctLastName: string,
    biopsyStatus: string): Promise<any> { 
      return new Promise((resolve, reject) => {
        Auth.currentUserCredentials().then((credentials) => {
          let expressions = this.constructExpressions(
            firstName, lastName, dob, gender, phoneNumber, ctFirstName, ctLastName,biopsyStatus);
          const params = {
            TableName: 'Patient',
            Key: {
              Id: patientId
            },
            ExpressionAttributeNames: expressions['names'], 
            ExpressionAttributeValues: expressions['values'], 
            UpdateExpression: expressions['update']
          };
          resolve(this.db.getDocumentClient(credentials).update(params).promise());
        })
        .catch(err => {
          console.log('get current credentials err', err);
          reject('get current credentials err');
        });
      });
    }

  removePatient(patient, credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: 'Patient',
        Key: {
          Id: patient['Id']
        }
      };
      resolve(this.db.getDocumentClient(credentials).delete(params).promise());
    });
  }

  watchPatient(patientId, username, credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      let docClient: DocumentClient = this.db.getDocumentClient(credentials);
      const params = {
        TableName: 'Patient',
        Key: {
          Id: patientId
        },
        UpdateExpression: 'ADD Watchers :w',
        ExpressionAttributeValues: {
          ":w": docClient.createSet([username])
        }
      };
      resolve(docClient.update(params).promise());
    });
  }

  unWatchPatient(patientId, username, credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      let docClient: DocumentClient = this.db.getDocumentClient(credentials);
      const params = {
        TableName: 'Patient',
        Key: {
          Id: patientId
        },
        UpdateExpression: 'DELETE Watchers :w',
        ExpressionAttributeValues: {
          ":w": docClient.createSet([username])
        }
      };
      resolve(docClient.update(params).promise());
    });
  }

  constructExpressions(
    firstName: string,
    lastName: string,
    dob: Date,
    gender: string,
    phoneNumber: string,
    ctFirstName: string,
    ctLastName: string,
    biopsyStatus: string
  ): any {
    let names = {};               // ExpressionAttributeNames
    let values = {};              // ExpressionAttributeValues
    let update: string = 'SET ';  // UpdateExpression
    if (firstName != null && firstName != '') {
      names['#f'] = 'FirstName';
      values[':f'] = firstName;
      update += '#f = :f,';
    }
    if (lastName != null && lastName != '') {
      names['#l'] = 'LastName';
      values[':l'] = lastName;
      update += '#l = :l,';
    }
    if (dob != null) {
      names['#d'] = 'DOB';
      values[':d'] = dob;
      update += '#d = :d,';
    }
    if (gender != null && gender != '') {
      names['#g'] = 'Gender';
      values[':g'] = gender;
      update += '#g = :g,';
    }
    if (phoneNumber != null && phoneNumber != '') {
      names['#p'] = 'PhoneNumber';
      values[':p'] = phoneNumber;
      update += '#p = :p,';
    }
    if (ctFirstName != null && ctFirstName != '') {
      names['#c'] = 'CtFirstName';
      values[':c'] = ctFirstName;
      update += '#c = :c,';
    }
    if (ctLastName != null && ctLastName != '') {
      names['#t'] = 'CtLastName';
      values[':t'] = ctLastName;
      update += '#t = :t,';
    }
    if (biopsyStatus != null && biopsyStatus != '') {
      names['#b'] = 'BiopsyStatus';
      values[':b'] = biopsyStatus;
      update += '#b = :b,';
    }

    update = update.replace(new RegExp('[,]$'), ''); // strip out last comma

    return {'names': names, 'values': values, 'update': update}
  };
}

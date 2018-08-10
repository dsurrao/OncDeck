import { DynamodbProvider } from './../dynamodb/dynamodb';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Auth } from 'aws-amplify';
import aws_exports from '../../assets/aws-exports'; 
import AWS from 'aws-sdk';
import { rejects } from 'assert';

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
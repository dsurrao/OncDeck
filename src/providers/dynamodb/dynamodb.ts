import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Logger } from 'aws-amplify';
import AWS from 'aws-sdk';

import Amplify from 'aws-amplify';

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

const logger = new Logger('DynamoDB');

/*
  Generated class for the DynamodbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DynamodbProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DynamodbProvider Provider');
  }

  getDocumentClient(credentials) {
    return new AWS.DynamoDB.DocumentClient({ credentials: credentials })
    // return Auth.currentCredentials()
    //   .then(credentials => new AWS.DynamoDB.DocumentClient({ credentials: credentials }))
    //   .catch(err => logger.debug('error getting document client', err));
  }

}
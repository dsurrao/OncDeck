import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Logger } from 'aws-amplify';
import AWS from 'aws-sdk';
import Amplify from 'aws-amplify';
import awsmobile from '../../assets/aws-exports'; 

Amplify.configure({
  Auth: {
  // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: awsmobile.aws_cognito_identity_pool_id, 
  // REQUIRED - Amazon Cognito Region
      region: awsmobile.aws_cognito_region, 
  // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: awsmobile.aws_user_pools_id,
  // OPTIONAL - Amazon Cognito Web Client ID
      userPoolWebClientId: awsmobile.aws_user_pools_web_client_id, 
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
    return new AWS.DynamoDB.DocumentClient({ credentials: credentials, dynamoDbCrc32: false })
    // return Auth.currentCredentials()
    //   .then(credentials => new AWS.DynamoDB.DocumentClient({ credentials: credentials }))
    //   .catch(err => logger.debug('error getting document client', err));
  }

}
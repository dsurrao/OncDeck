import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PatientsPage } from '../pages/patients/patients';
import { Api } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { AwsConfig } from './app.config';
import { LoginModal } from '../modal/login/login';
import { LogoutModal } from '../modal/logout/logout';
import { PatientPage } from '../pages/patient/patient';
import { DynamodbProvider } from '../providers/dynamodb/dynamodb';

import Amplify from 'aws-amplify';

@NgModule({
  declarations: [
    MyApp,
    PatientsPage,
    PatientPage,
    LoginModal,
    LogoutModal
  ],
  imports: [
    BrowserModule,
//    IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, new AwsConfig().load()),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PatientsPage,
    PatientPage,
    LoginModal,
    LogoutModal
  ],
  providers: [
    Api,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DynamodbProvider
  ]
})
export class AppModule {}

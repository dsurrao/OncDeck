import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { PatientsPage } from '../pages/patients/patients';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { LoginModal } from '../modal/login/login';
import { LogoutModal } from '../modal/logout/logout';
import { PatientPage } from '../pages/patient/patient';
import { DynamodbProvider } from '../providers/dynamodb/dynamodb';

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
    IonicModule.forRoot(MyApp),
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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DynamodbProvider
  ]
})
export class AppModule {}

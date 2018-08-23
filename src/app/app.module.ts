import { AboutPage } from './../pages/about/about';
import { TabsPage } from './../pages/tabs/tabs';
import { PatientSummaryComponent } from './../components/patient-summary/patient-summary';
import { DateUtils } from './../common/dateutils';
import { ScheduledSurgeryPage } from './../pages/scheduled-surgery/scheduled-surgery';
import { PathologySurgeryPage } from './../pages/pathology-surgery/pathology-surgery';
import { BiopsyOrderPage } from './../pages/biopsy-order/biopsy-order';
import { BiopsyReportPage1Page } from './../pages/biopsy-report-page1/biopsy-report-page1';
import { BiopsyStatusPage } from './../pages/biopsy-status/biopsy-status';
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
import { PatientFormPage } from '../pages/patient-form/patient-form';
import { DynamodbProvider } from '../providers/dynamodb/dynamodb';
import { BiopsyProvider } from '../providers/biopsy/biopsy';
import { SurgeryProvider } from '../providers/surgery/surgery';
import { PatientProvider } from '../providers/patient/patient';
import { PathologySurgery } from '../providers/pathology/pathology';
import { GraphPage } from '../pages/graph/graph';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    PatientsPage,
    PatientPage,
    PatientFormPage,
    LoginModal,
    LogoutModal,
    BiopsyStatusPage,
    BiopsyReportPage1Page,
    BiopsyOrderPage,
    ScheduledSurgeryPage,
    PathologySurgeryPage,
    GraphPage,
    PatientSummaryComponent,
    TabsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PatientsPage,
    PatientPage,
    PatientFormPage,
    LoginModal,
    LogoutModal,
    BiopsyStatusPage,
    BiopsyReportPage1Page,
    BiopsyOrderPage,
    ScheduledSurgeryPage,
    PathologySurgeryPage,
    TabsPage,
    AboutPage,
    GraphPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DynamodbProvider,
    BiopsyProvider,
    SurgeryProvider,
    DateUtils,
    PatientProvider,
    PathologySurgery
  ]
})
export class AppModule {}

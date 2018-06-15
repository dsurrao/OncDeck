import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PatientsPage } from '../pages/patients/patients';

import Amplify from 'aws-amplify';
import aws_exports from '../assets/aws-exports'; // specify the location of aws-exports.js file on your project

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PatientsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      Amplify.configure(aws_exports);
    });
  }
}


import { Component } from '@angular/core';
import { PatientsPage } from './../patients/patients';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PatientsPage;
  tab2Root = AboutPage;

  constructor() {

  }
}

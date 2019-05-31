import { Component, OnInit } from '@angular/core';
import { PatientsPage } from '../patients/patients.page';
import { AboutPage } from '../about/about.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  tab1Root = PatientsPage;
  tab2Root = AboutPage;

  constructor() { }

  ngOnInit() {
  }
  
}
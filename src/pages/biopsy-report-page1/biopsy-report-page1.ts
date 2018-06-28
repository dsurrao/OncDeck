import { BiopsyProvider } from './../../providers/biopsy/biopsy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BiopsyReportPage1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biopsy-report-page1',
  templateUrl: 'biopsy-report-page1.html',
})
export class BiopsyReportPage1Page {
  procedureDate: Date;
  reportDate: Date;
  hospital: string;
  pathologist: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public biopsy: BiopsyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiopsyReportPage1Page');
  }

}

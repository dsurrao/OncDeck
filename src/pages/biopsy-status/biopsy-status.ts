import { BiopsyOrderPage } from './../biopsy-order/biopsy-order';
import { PatientsPage } from './../patients/patients';
import { BiopsyReportPage1Page } from './../biopsy-report-page1/biopsy-report-page1';
import { BiopsyProvider } from './../../providers/biopsy/biopsy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BiopsyStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biopsy-status',
  templateUrl: 'biopsy-status.html',
})
export class BiopsyStatusPage {
  patient:any;
  biopsyStatus:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public biopsy:BiopsyProvider) {
    this.patient = navParams.data.params;
    this.biopsyStatus = this.patient['BiopsyStatus'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiopsyStatusPage');
  }

  next() {
    //this.navCtrl.push(BiopsyReportPage1Page);
    this.biopsy.updateStatus(this.patient['Id'], this.biopsyStatus).then((resp) => {
        if (this.biopsyStatus == "scheduled") {
          this.navCtrl.push(BiopsyOrderPage, {params: this.patient});
        }
        else {
          this.navCtrl.push(PatientsPage);
        }
      }
    ).catch((err) => {
      console.log('BiopsyStatusPage error');
    });
  }

}

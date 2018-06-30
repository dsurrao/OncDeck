import { PatientsPage } from './../patients/patients';
import { BiopsyProvider } from './../../providers/biopsy/biopsy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BiopsyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biopsy-order',
  templateUrl: 'biopsy-order.html',
})
export class BiopsyOrderPage {
  patient: any;
  scheduledDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public biopsy: BiopsyProvider) {
    this.patient = this.navParams.data.params;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiopsyOrderPage');
  }

  save() {
    this.biopsy.saveScheduledDate(this.patient['Id'], this.scheduledDate).then((resp) => {
      this.navCtrl.push(PatientsPage);
      console.log("schedule saved!");
    });
  }

}

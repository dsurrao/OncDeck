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
  scheduledDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public biopsy: BiopsyProvider) {
    this.patient = this.navParams.data.params;

    // if patient does not have scheduled biopsy, set the scheduled date as current date for now.  if left alone,
    // error would be thrown
    if (this.patient.ScheduledBiopsyDate == undefined)
    {
      console.log("has not been scheduled yet, set time to current time");
      this.scheduledDate = new Date().toISOString();
    }
    
    // else set the scheduled date since it has already been created
    else {
      console.log("scheduled already");
      this.scheduledDate = this.patient.ScheduledBiopsyDate;
    }
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

import { PatientPage } from './../patient/patient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurgeryProvider } from '../../providers/surgery/surgery';

/**
 * Generated class for the ScheduledSurgeryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheduled-surgery',
  templateUrl: 'scheduled-surgery.html',
})
export class ScheduledSurgeryPage {
  patient: any;
  surgery: any; // pass in existing surgery details, if this is for an update
  scheduledDate: Date;
  facility: string;
  providerName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public surgerySvc: SurgeryProvider) {
    this.patient = navParams.data.params.patient;
    this.surgery = navParams.data.params.surgery;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduledSurgeryPage');
  }

  save() {    
    this.surgerySvc.schedule(this.patient, this.surgery, this.scheduledDate, this.facility, this.providerName).then((resp) => {
      this.navCtrl.push(PatientPage, {params: this.patient});
    });
  }

}

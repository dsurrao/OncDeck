import { DateUtils } from './../../common/dateutils';
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  scheduledDate: string; // yyyy-mm-dd
  completedDate: string; // yyyy-mm-dd
  facility: string;
  providerName: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public surgerySvc: SurgeryProvider,
    public events: Events,
    public dateUtils: DateUtils) {
    this.patient = navParams.data.params.patient;
    this.surgery = navParams.data.params.surgery;
    if (this.surgery != null) {
      this.scheduledDate = dateUtils.isoStringToYyyymmdd(this.surgery['ScheduledDate']);
      this.facility = this.surgery['Facility'];
      this.providerName = this.surgery['ProviderName'];
      this.completedDate = this.surgery['CompletedDate'];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduledSurgeryPage');
  }

  submit() {
    this.surgerySvc.schedule(this.patient, this.surgery, this.scheduledDate, this.facility, 
      this.providerName, this.completedDate).then((resp) => {
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    });
  }

}

import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurgeryProvider } from '../../providers/surgery/surgery';
import { Patient } from '../../models/patient';
import { Surgery } from '../../models/surgery';

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
  patient: Patient;
  surgery: Surgery; // pass in existing surgery details, if this is for an update

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public surgerySvc: SurgeryProvider,
    public events: Events) {
    this.patient = navParams.data.params.patient;
    this.surgery = navParams.data.params.surgery;
    if (this.surgery == null) {
      this.surgery = new Surgery();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduledSurgeryPage');
  }

  submit() {
    this.surgerySvc.save(this.patient, this.surgery).then((resp) => {
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    });
  }

}

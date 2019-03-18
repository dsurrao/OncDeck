import { Component } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurgeryProvider } from '../../providers/surgery/surgery';
import { Patient } from '../../models/patient';
import { Surgery } from '../../models/surgery';
import { DateUtils } from '../../common/dateutils';

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
  scheduledDate: string;
  completedDate: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public surgerySvc: SurgeryProvider,
    public events: Events,
    public dateUtils: DateUtils,
    public alertController: AlertController) {
    this.patient = navParams.data.params.patient;
    this.surgery = navParams.data.params.surgery;
    if (this.surgery == null) {
      this.surgery = new Surgery();
    }
    else {
      this.scheduledDate = this.dateUtils.isoStringToYyyymmdd(this.surgery.scheduledDate);
      if (this.surgery.completedDate != null) {
        this.completedDate = this.dateUtils.isoStringToYyyymmdd(this.surgery.completedDate);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduledSurgeryPage');
  }

  submit() {
    if (this.scheduledDate != null) {
      this.surgery.scheduledDate = this.dateUtils.yyyymmddToISOString(this.scheduledDate);
    }
    if (this.completedDate != null) {
      this.surgery.completedDate = this.dateUtils.yyyymmddToISOString(this.completedDate);
    }
    this.surgerySvc.save(this.patient, this.surgery).then((resp) => {
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    }).catch((error) => {
      let title: string = 'Error saving patient';
      let subTitle: string = '';
      if (error.status == '409') {
        subTitle = "This patient's data was updated by somewhere else; please refresh data via the home page";
      }
      else {
        subTitle = error;
      }
      this.showAlert(title, subTitle);
    });
  }

  showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = this.alertController.create({
      title: titleTxt,
      subTitle: subTitleTxt,
      buttons: ['OK']
    });
    alert.present();
  }

}

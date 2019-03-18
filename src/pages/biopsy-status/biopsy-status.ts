import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Patient } from '../../models/patient';
import { PatientProvider } from '../../providers/patient/patient';
import { Events } from 'ionic-angular';
import { PatientPage } from '../patient/patient';
import { BiopsyStatus } from '../../models/biopsy-status';

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
  patient: Patient;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public patientSvc: PatientProvider,
    public events: Events,
    public alertController: AlertController) {
    this.patient = navParams.data.params;
    if (this.patient.biopsyStatus == null) {
      this.patient.biopsyStatus = new BiopsyStatus();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiopsyStatusPage');
  }

  next() {
    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      console.log("patient saved");
      this.navCtrl.pop();
      this.navCtrl.push(PatientPage, {params: updatedPatient});
    })
    .catch(error => {
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

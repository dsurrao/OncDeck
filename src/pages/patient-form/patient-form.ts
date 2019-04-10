import { Component, ViewChild } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid';
import { PatientProvider } from '../../providers/patient/patient';
import { Patient } from '../../models/patient';
import { BiopsyStatusPage } from '../biopsy-status/biopsy-status';
import { FormGroup, Form } from '@angular/forms';

/**
 * Generated class for the PatientFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-form',
  templateUrl: 'patient-form.html',
})
export class PatientFormPage {
  @ViewChild('patientForm') patientForm: FormGroup;
  patient: Patient;
  originalFormGroupValue: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public patientSvc: PatientProvider,
    public events: Events,
    public alertController: AlertController) {
    this.patient = this.navParams.data.params;
    if (this.patient == null) {
      this.patient = new Patient();
      this.patient._id = UUID.v4();
    }
  }

  ionViewDidEnter() { 
    this.originalFormGroupValue = this.patientForm.value;
  }

  submit() {
    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      console.log("patient saved");
      this.events.publish('patientSaved');
      this.navCtrl.push(BiopsyStatusPage, {params: updatedPatient});
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
      this.patientForm.reset(this.originalFormGroupValue);
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

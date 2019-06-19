import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, Events, NavController, NavParams } from '@ionic/angular';
import UUID from 'uuid';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { FormGroup, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.page.html',
  styleUrls: ['./patient-form.page.scss'],
})
export class PatientFormPage implements OnInit {
  @ViewChild('patientForm') patientForm: FormGroup;
  patient: Patient = new Patient();
  originalFormGroupValue: any;
  patientId: string;

  constructor(public navCtrl: NavController, 
    public patientSvc: PatientService,
    public events: Events,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('id');
    // existing patient
    if (this.patientId != null) {
      this.patientSvc.getPatient(this.patientId).then((patient) => {
        this.patient = patient;
      });
    }
  }

  ionViewDidEnter() { 
    this.originalFormGroupValue = this.patientForm.value;
  }

  submit() {
    // new patient
    if (this.patient._id == null) {
      this.patient._id = UUID.v4();
    }
    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      console.log("patient saved");
      this.events.publish('patientSaved');
      this.navCtrl.navigateForward('/patient/' + this.patient._id + '/biopsy');
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

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      message: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }
}

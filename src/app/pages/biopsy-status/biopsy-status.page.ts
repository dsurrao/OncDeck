import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, Events } from '@ionic/angular';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { BiopsyStatus } from '../../models/biopsy-status';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biopsy-status',
  templateUrl: './biopsy-status.page.html',
  styleUrls: ['./biopsy-status.page.scss'],
})
export class BiopsyStatusPage implements OnInit {
  patient: Patient = new Patient();

  constructor(public navCtrl: NavController, 
    public patientSvc: PatientService,
    public events: Events,
    public alertController: AlertController,
    public route: ActivatedRoute) {
    if (this.patient.biopsyStatus == null) {
      this.patient.biopsyStatus = new BiopsyStatus();
    }
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('id');
    // existing patient
    if (patientId != null) {
      this.patientSvc.getPatient(patientId).then((patient) => {
        this.patient = patient;
      });
    }
  }

  next() {
    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      console.log("patient saved");
      this.navCtrl.navigateBack('patient/' + this.patient._id);
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

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      header: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }
} 

import { Component, OnInit } from '@angular/core';
import { DateUtils } from './../../common/dateutils';
import { Events, ModalController, AlertController } from '@ionic/angular';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  patient: Patient = new Patient();
  
  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
    public dateUtils: DateUtils,
    public route: ActivatedRoute,
    public patientSvc: PatientService,
    public surgerySvc: SurgeryService
    ) {
  }

  ngOnInit() {
    this.refreshPatient();

    this.events.subscribe('patientSaved', () => {
      this.refreshPatient();
    });
  }
  
  refreshPatient() {
    let id = this.route.snapshot.paramMap.get('id');
    this.patientSvc.getPatient(id).then((patient) => {
      this.patient = patient;
      this.patient['genderInitial'] = this.getGenderInitial(this.patient['Gender']);
    });
  }
  
  getGenderInitial(gender: String): string {
    let genderInitial = 'U';
    if (gender != null) {
      if (gender.toLowerCase() == 'female') {
        genderInitial = 'F';
      }
      else if (gender.toLowerCase() == 'male') {
        genderInitial = 'M';
      }
    }
    return genderInitial;
  }

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertCtrl.create({
      message: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }
}

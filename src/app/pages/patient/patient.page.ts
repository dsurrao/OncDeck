import { Component, OnInit, ViewChild } from '@angular/core';
import { DateUtils } from './../../common/dateutils';
import { Events, ModalController, AlertController, IonTabs, IonTabBar } from '@ionic/angular';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';
import { generateKeyPair } from 'crypto';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  patient: Patient;

  tabClicked: string;
  summaryButtonColor: string;
  stagingButtonColor: string;
  biopsyButtonColor: string;
  surgeryButtonColor: string;
  radiationButtonColor: string;
  timelineButtonColor: string;
  
  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
    public dateUtils: DateUtils,
    public route: ActivatedRoute,
    public patientSvc: PatientService,
    public surgerySvc: SurgeryService
    ) {
      this.resetTabButtons();
      this.tabClicked = 'summary';
      this.summaryButtonColor = 'primary';
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

  summaryTabClicked() {
    this.tabClicked = 'summary';
    this.resetTabButtons();
    this.summaryButtonColor = 'primary';
  }

  biopsyTabClicked() {
    this.tabClicked = 'biopsy';
    this.resetTabButtons();
    this.biopsyButtonColor = 'primary';
  }

  radiationTabClicked() {
    this.tabClicked = 'radiation';
    this.resetTabButtons();
    this.radiationButtonColor = 'primary';
  }

  stagingTabClicked() {
    this.tabClicked = 'staging';
    this.resetTabButtons();
    this.stagingButtonColor = 'primary';
  }

  surgeryTabClicked() {
    this.tabClicked = 'surgery';
    this.resetTabButtons();
    this.surgeryButtonColor = 'primary';
  }

  timelineTabClicked() {
    this.tabClicked = 'timeline';
    this.resetTabButtons();
    this.timelineButtonColor = 'primary';
  }

  resetTabButtons() {
    this.summaryButtonColor = 'secondary';
    this.stagingButtonColor = 'secondary';
    this.biopsyButtonColor = 'secondary';
    this.radiationButtonColor = 'secondary';
    this.surgeryButtonColor = 'secondary';
    this.timelineButtonColor = 'secondary';
  }
}

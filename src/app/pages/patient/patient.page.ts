import { Component, OnInit  } from '@angular/core';
import { DateUtils } from './../../common/dateutils';
import { Events, ModalController, AlertController } from '@ionic/angular';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';
import { Staging } from 'src/app/models/staging';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  patient: Patient;
  stagings: Staging[];

  summaryButtonColor: string;
  stagingButtonColor: string;
  biopsyButtonColor: string;
  surgeryButtonColor: string;
  chemotherapyButtonColor: string;
  radiationButtonColor: string;
  timelineButtonColor: string;
  tabClicked: string;
  
  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public events: Events,
    public dateUtils: DateUtils,
    public route: ActivatedRoute,
    public patientSvc: PatientService,
    public surgerySvc: SurgeryService
    ) {
      this.resetTabButtons('summary');
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('tab') != null) {
      this.resetTabButtons(this.route.snapshot.queryParamMap.get('tab'));
    }

    this.refreshPatient();

    this.events.subscribe('patientSaved', () => {
      this.refreshPatient();
    });
  }

  ionViewDidEnter() {
    this.refreshPatient();
  }
  
  refreshPatient() {
    let id = this.route.snapshot.paramMap.get('id');
    this.patientSvc.getPatient(id).then((patient) => {
      
      if (patient.stagings != null) {
        this.stagings = patient.stagings;
      }

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

  resetTabButtons(tabClicked: string) {
    this.summaryButtonColor = tabClicked == 'summary' ? 'primary' : 'secondary';
    this.stagingButtonColor = tabClicked == 'staging' ? 'primary' : 'secondary';
    this.biopsyButtonColor = tabClicked == 'biopsy' ? 'primary' : 'secondary';
    this.chemotherapyButtonColor = tabClicked == 'chemotherapy' ? 'primary' : 'secondary';
    this.radiationButtonColor = tabClicked == 'radiation' ? 'primary' : 'secondary';
    this.surgeryButtonColor = tabClicked == 'surgery' ? 'primary' : 'secondary';
    this.timelineButtonColor = tabClicked == 'timeline' ? 'primary' : 'secondary';
    this.tabClicked = tabClicked;
  }
}

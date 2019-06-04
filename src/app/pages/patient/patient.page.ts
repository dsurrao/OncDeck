import { Component, OnInit, ViewChild } from '@angular/core';
import { DateUtils } from './../../common/dateutils';
// import { ScheduledSurgeryPage } from './../scheduled-surgery/scheduled-surgery';
// import { PathologySurgeryPage } from './../pathology-surgery/pathology-surgery';
// import { PatientFormPage } from './../patient-form/patient-form';
import { Events, 
  //IonicPage, 
  NavController, 
  NavParams, 
  ModalController, 
  AlertController, 
  IonList 
} from '@ionic/angular';
import { SurgicalPathology } from '../../models/surgical-pathology';
import { Surgery } from '../../models/surgery';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  @ViewChild('surgeryList', {read: IonList}) surgeryList: IonList;
  @ViewChild('surgicalPathologyList', {read: IonList}) surgicalPathologyList: IonList;

  patient: Patient = new Patient();
  pathologies: any;

  constructor(
//    public navCtrl: NavController, 
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
      this.pathologies = this.patient['Pathologies'] != null ? this.patient['Pathologies'] : [];
      // this.patient['Age'] = dateUtils.getAge(this.patient['DOB']);
    });
  }

  async removeSurgeryConfirm(surgery: Surgery) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove surgery entry?',
      subHeader: 'Are you sure you want to remove this surgery entry?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.surgeryList.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.surgeryList.closeSlidingItems();
            this.removeSurgery(surgery);
          }
        }
      ]
    });
    await confirm.present();
  }

  removeSurgery(surgery: Surgery) {
    this.surgerySvc.removeSurgery(surgery, this.patient).then((patient) => {
      // do nothing
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

  async removeSurgicalPathologyConfirm(pathology: SurgicalPathology) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove surgical pathology report?',
      subHeader: 'Are you sure you want to remove this surgical pathology report?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.surgicalPathologyList.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.surgicalPathologyList.closeSlidingItems();
            this.removeSurgicalPathology(pathology);
          }
        }
      ]
    });
    await confirm.present();
  }

  removeSurgicalPathology(pathology: SurgicalPathology) {
    this.surgerySvc.removeSurgicalPathology(pathology, this.patient).then((patient) => {
      // do nothing
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

  toLocaleDateString(isoString: string): string {
    return new Date(isoString).toLocaleDateString();
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

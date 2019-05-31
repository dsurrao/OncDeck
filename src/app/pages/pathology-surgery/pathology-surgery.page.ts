
import { Component, OnInit } from '@angular/core';
import { AlertController, Events, NavController } from '@ionic/angular';
import UUID from 'uuid';
import { Patient } from '../../models/patient';
import { PouchdbService } from '../../services/pouchdb.service';
import { SurgicalPathology } from '../../models/surgical-pathology';
import { SurgeryType } from '../../enums/surgery-type';
import { SurgeryHistology } from '../../enums/surgery-histology';
import { EstrogenReceptor } from '../../enums/er-receptor';
import { ProgesteroneReceptor } from '../../enums/pr-receptor';
import { Her2Receptor } from '../../enums/her2-receptor';
import { SurgicalFeature } from '../../enums/surgical-feature';
import { SurgicalMargin } from '../../enums/surgical-margin';
import { DateUtils } from '../../common/dateutils';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';

@Component({
  selector: 'app-pathology-surgery',
  templateUrl: './pathology-surgery.page.html',
  styleUrls: ['./pathology-surgery.page.scss'],
})
export class PathologySurgeryPage implements OnInit {
  patient: Patient = new Patient();
  surgicalPathology: SurgicalPathology = new SurgicalPathology();
  surgeryDate: string;

  // make these enums available in template
  surgeryType = SurgeryType; 
  surgeryHistology = SurgeryHistology;
  estrogenReceptor = EstrogenReceptor;
  progesteroneReceptor = ProgesteroneReceptor;
  her2Receptor = Her2Receptor;
  surgicalFeature = SurgicalFeature;
  surgicalMargin = SurgicalMargin;

  constructor(public navCtrl: NavController, 
    public db: PouchdbService,
    public patientSvc: PatientService,
    public surgerySvc: SurgeryService,
    public events: Events,
    public dateUtils: DateUtils,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientSvc.getPatient(patientId).then((patient) => {
      this.patient = patient;
    });

    let pathologyId = this.route.snapshot.paramMap.get('pathologyId');
    if (pathologyId != null) {
      this.surgerySvc.getSurgicalPathology(pathologyId).then((pathology) => {
        this.surgicalPathology = pathology;
        this.surgeryDate = this.dateUtils.isoStringToYyyymmdd(this.surgicalPathology.surgeryDate);
      });
    }
  }
  
  submit() {
    if (this.surgeryDate != null) {
      this.surgicalPathology.surgeryDate = this.dateUtils.yyyymmddToISOString(this.surgeryDate);
    }

    if (this.patient.surgicalPathologies == null) {
      this.patient.surgicalPathologies = [];
    }

    if (this.surgicalPathology.id == null) {
      // this is a new entry
      this.surgicalPathology.id = UUID.v4();
      this.patient.surgicalPathologies.push(this.surgicalPathology);
    }
    else {
      for (var i = 0; i < this.patient.surgicalPathologies.length; i++) {
        if (this.patient.surgicalPathologies[i].id === this.surgicalPathology.id) {
          this.patient.surgicalPathologies[i] = this.surgicalPathology;
          break;
        }
      }
    }

    this.db.savePatient(this.patient).then((resp) => {
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

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      header: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }
}

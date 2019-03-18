import { Component } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid';
import { Patient } from '../../models/patient';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';
import { SurgicalPathology } from '../../models/surgical-pathology';
import { SurgeryType } from '../../enums/surgery-type';
import { SurgeryHistology } from '../../enums/surgery-histology';
import { EstrogenReceptor } from '../../enums/er-receptor';
import { ProgesteroneReceptor } from '../../enums/pr-receptor';
import { Her2Receptor } from '../../enums/her2-receptor';
import { SurgicalFeature } from '../../enums/surgical-feature';
import { SurgicalMargin } from '../../enums/surgical-margin';
import { DateUtils } from '../../common/dateutils';

/**
 * Generated class for the PathologySurgeryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pathology-surgery',
  templateUrl: 'pathology-surgery.html',
})
export class PathologySurgeryPage {
  patient: Patient;
  surgicalPathology: SurgicalPathology;
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
    public navParams: NavParams, 
    public db: PouchdbProvider,
    public events: Events,
    public dateUtils: DateUtils,
    public alertController: AlertController) {
      this.patient = navParams.data.params.patient;
      this.surgicalPathology = navParams.data.params.surgicalPathology;
      if (this.surgicalPathology == null) {
        this.surgicalPathology = new SurgicalPathology();
      }
      else {
        this.surgeryDate = this.dateUtils.isoStringToYyyymmdd(this.surgicalPathology.surgeryDate);
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PathologySurgeryPage');
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

  showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = this.alertController.create({
      title: titleTxt,
      subTitle: subTitleTxt,
      buttons: ['OK']
    });
    alert.present();
  }
}

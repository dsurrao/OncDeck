import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import UUID from 'uuid';
import { Patient } from '../../models/patient';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';
import { SurgicalPathology } from '../../models/surgical-pathology';
import { SurgeryType } from '../../models/surgery-type';
import { SurgeryHistology } from '../../models/surgery-histology';
import { EstrogenReceptor } from '../../models/er-receptor';
import { ProgesteroneReceptor } from '../../models/pr-receptor';
import { Her2Receptor } from '../../models/her2-receptor';
import { SurgicalFeature } from '../../models/surgical-feature';
import { SurgicalMargin } from '../../models/surgical-margin';

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
    public events: Events) {
      this.patient = navParams.data.params.patient;
      this.surgicalPathology = navParams.data.params.surgicalPathology;
      if (this.surgicalPathology == null) {
        this.surgicalPathology = new SurgicalPathology();
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PathologySurgeryPage');
  }
  
  submit() {
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
    });
  }
}

import { DateUtils } from './../../common/dateutils';
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PathologySurgery } from '../../providers/pathology/pathology';

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
  patient: any;
  pathology: any;
  surgeryType: string;
  surgeryHistology: string;
  surgicalFeatures: string;
  surgicalMargins: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public pathologySvc: PathologySurgery,
    public events: Events,
    public dateUtils: DateUtils)
    {
      this.patient = navParams.data.params.patient;
      this.pathology = navParams.data.params.pathology;
      if (this.pathology != null) {
        this.surgeryType = this.pathology["SurgeryType"];
        this.surgeryHistology = this.pathology["SurgeryHistology"];
        this.surgicalFeatures =this.pathology["SurgicalFeatures"];
        this.surgicalMargins = this.pathology["SurgicalMargins"];
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PathologySurgeryPage');
  }

  submit() {
    this.pathologySvc.pathology(this.patient, this.surgeryType, this.surgeryHistology, this.surgicalFeatures, 
      this.surgicalMargins).then((resp) => {
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    });
  }

}

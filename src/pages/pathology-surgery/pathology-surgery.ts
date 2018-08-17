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
  surgeryHistologies: any
  surgeryHistologiesToSubmit: any;
  estrogrenReceptor: string;
  progesteroneReceptor: string;
  heReceptor: string;
  surgicalFeatures: string;
  surgicalMargins: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public pathologySvc: PathologySurgery,
    public events: Events,
    public dateUtils: DateUtils)
    {
      this.surgeryHistologies = [{"name":"Import Summary of Biopsy Pathology", "checked": false},{"name":"Invasive Ductal Carcinoma", "checked": false},{"name":"Invasive Lobular Carcinoma", "checked": false},{"name":"DCIS (Ductal Carcinoma In Situ)", "checked": false},{"name":"LCIS (Lobular Carcinoma In Situ)", "checked": false},{"name":"Other", "checked": false}];
      this.patient = navParams.data.params.patient;
      this.pathology = navParams.data.params.pathology;
      if (this.pathology != null) {
        this.surgeryType = this.pathology["SurgeryType"];
        this.fillSurgeryHistologies(this.pathology["SurgeryHistology"]);
        this.estrogrenReceptor = this.pathology["EstrogrenReceptor"];
        this.progesteroneReceptor = this.pathology["ProgesteroneReceptor"];
        this.heReceptor = this.pathology["HeReceptor"];
        this.surgicalFeatures =this.pathology["SurgicalFeatures"];
        this.surgicalMargins = this.pathology["SurgicalMargins"];
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PathologySurgeryPage');
  }

  // on page load, check which histologies have been saved, and check it
  fillSurgeryHistologies(surgeryHistologies) {
    if (surgeryHistologies != null) {
      for (var item in this.surgeryHistologies) {
        var histology = this.surgeryHistologies[item];
        if (surgeryHistologies.indexOf(histology.name) != -1) {
          this.surgeryHistologies[item].checked = true;
        }
      }
    }
  }

  // on submit, loop through checked histologies and add it to array for submission
  assembleHistologiesToSubmit() {
    this.surgeryHistologiesToSubmit = [];
    for (var item in this.surgeryHistologies) {
      var histology = this.surgeryHistologies[item];
      if (histology.checked) {
          this.surgeryHistologiesToSubmit.push(histology.name);
      }
    }
  }
  
  submit() {
    this.assembleHistologiesToSubmit();
    
    this.pathologySvc.pathology(this.patient, this.surgeryType, this.surgeryHistologiesToSubmit, this.surgicalFeatures, 
      this.surgicalMargins, this.estrogrenReceptor, this.progesteroneReceptor, this.heReceptor).then((resp) => {
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    });
  }
  
}

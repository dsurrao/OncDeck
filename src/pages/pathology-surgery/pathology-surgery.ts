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
  receptors: any;
  receptorStatusesToSubmit: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public pathologySvc: PathologySurgery,
    public events: Events,
    public dateUtils: DateUtils)
    {
      this.receptors = [{"name":'ER+', "checked": false},{"name":'ER-', "checked": false},{"name":'PR+', "checked": false},{"name":'PR-', "checked": false},{"name":'HER2+', "checked": false},{"name":'HER2-', "checked": false}];
      this.patient = navParams.data.params.patient;
      this.pathology = navParams.data.params.pathology;
      if (this.pathology != null) {
        this.surgeryType = this.pathology["SurgeryType"];
        this.surgeryHistology = this.pathology["SurgeryHistology"];
        this.fillReceptorStatuses(this.pathology["ReceptorStatuses"]);
        this.surgicalFeatures =this.pathology["SurgicalFeatures"];
        this.surgicalMargins = this.pathology["SurgicalMargins"];
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PathologySurgeryPage');
  }

  // on page load, check which receptors have been saved, and check it
  fillReceptorStatuses(receptorStatuses) {
    if (receptorStatuses != null) {
      for (var item in this.receptors) {
        var receptor = this.receptors[item];
        if (receptorStatuses.indexOf(receptor.name) != -1) {
          this.receptors[item].checked = true;
        }
      }
    }
  }

  // on submit, loop through checked receptors and add it to array for submission
  assembleReceptorStatusToSubmit() {
    this.receptorStatusesToSubmit = [];
    for (var item in this.receptors) {
      var receptor = this.receptors[item];
      if (receptor.checked) {
          this.receptorStatusesToSubmit.push(receptor.name);
      }
    }
  }
  
  submit() {
    this.assembleReceptorStatusToSubmit();

    this.pathologySvc.pathology(this.patient, this.surgeryType, this.surgeryHistology, this.surgicalFeatures, 
      this.surgicalMargins, this.receptorStatusesToSubmit).then((resp) => {
      this.events.publish('patientSaved');
      this.navCtrl.pop();
    });
  }

}

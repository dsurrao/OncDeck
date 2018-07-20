import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateTime } from 'aws-sdk/clients/rekognition';

/**
 * Generated class for the CompletedSurgeryPage1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed-surgery-page1',
  templateUrl: 'completed-surgery-page1.html',
})
export class CompletedSurgeryPage1Page {
  completedDate: Date;
  facility: string;
  providerName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedSurgeryPage1Page');
  }

  save() {
    
  }

}

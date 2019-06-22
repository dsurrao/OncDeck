import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { DateUtils } from 'src/app/common/dateutils';
import { IonList, AlertController, Events } from '@ionic/angular';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { BiopsyService } from 'src/app/services/biopsy.service';

@Component({
  selector: 'completed-biopsy-items',
  templateUrl: './completed-biopsy-items.component.html',
  styleUrls: ['./completed-biopsy-items.component.scss'],
})
export class CompletedBiopsyItemsComponent implements OnInit {

  @Input('patient') patient: Patient;
  @ViewChild('biopsyList', {read: IonList}) list: IonList;

  constructor(public dateUtils: DateUtils, 
    public alertCtrl: AlertController,
    public biopsySvc: BiopsyService,
    public events: Events) { }

  ngOnInit() {}

  async removeBiopsyConfirm(biopsy: CompletedBiopsy) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove completed biopsy entry?',
      subHeader: 'Are you sure you want to remove this completed biopsy entry?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.list.closeSlidingItems();
            this.removeCompletedBiopsy(biopsy);
          }
        }
      ]
    });
    await confirm.present();
  }

  removeCompletedBiopsy(biopsy: CompletedBiopsy) {
    this.biopsySvc.removeCompletedBiopsy(biopsy, this.patient).then((patient) => {
      this.events.publish('patientSaved');
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
    const alert = await this.alertCtrl.create({
      message: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }

}

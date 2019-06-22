import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { RadiationTherapy } from 'src/app/models/radiation-therapy';
import { AlertController, IonList, Events } from '@ionic/angular';
import { RadiationService } from 'src/app/services/radiation.service';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'radiation-therapy-items',
  templateUrl: './radiation-therapy-items.component.html',
  styleUrls: ['./radiation-therapy-items.component.scss'],
})
export class RadiationTherapyItemsComponent implements OnInit {

  @Input('patient') patient: Patient;
  @ViewChild('therapyList', {read: IonList}) list: IonList;

  constructor(public alertCtrl: AlertController,
    public radiationSvc: RadiationService,
    public dateUtils: DateUtils,
    public events: Events) { }

  ngOnInit() {}

  async removeRadiationTherapyConfirm(radiationTherapy: RadiationTherapy) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove surgery entry?',
      subHeader: 'Are you sure you want to remove this surgery entry?',
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
            this.removeRadiationTherapy(radiationTherapy);
          }
        }
      ]
    });
    await confirm.present();
  }

  removeRadiationTherapy(radiationTherapy: RadiationTherapy) {
    this.radiationSvc.removeRadiationTherapy(radiationTherapy, this.patient).then((patient) => {
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

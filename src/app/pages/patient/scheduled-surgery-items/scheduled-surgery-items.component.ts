import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Surgery } from 'src/app/models/surgery';
import { AlertController, IonList } from '@ionic/angular';
import { SurgeryService } from 'src/app/services/surgery.service';
import { Patient } from 'src/app/models/patient';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'scheduled-surgery-items',
  templateUrl: './scheduled-surgery-items.component.html',
  styleUrls: ['./scheduled-surgery-items.component.scss'],
})
export class ScheduledSurgeryItemsComponent implements OnInit {
  @Input('patient') patient: Patient;
  @ViewChild('surgeryList', {read: IonList}) surgeryList: IonList;

  constructor(public alertCtrl: AlertController,
    public surgerySvc: SurgeryService,
    public dateUtils: DateUtils) { }

  ngOnInit() {}

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

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertCtrl.create({
      message: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }
}

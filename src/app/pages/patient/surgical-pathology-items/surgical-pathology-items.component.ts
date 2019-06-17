import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AlertController, IonList } from '@ionic/angular';
import { SurgeryService } from 'src/app/services/surgery.service';
import { SurgicalPathology } from 'src/app/models/surgical-pathology';
import { Patient } from 'src/app/models/patient';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'surgical-pathology-items',
  templateUrl: './surgical-pathology-items.component.html',
  styleUrls: ['./surgical-pathology-items.component.scss'],
})
export class SurgicalPathologyItemsComponent implements OnInit {

  @Input('patient') patient: Patient;
  @ViewChild('surgicalPathologyList', {read: IonList}) surgicalPathologyList: IonList;

  constructor(public alertCtrl: AlertController,
    public surgerySvc: SurgeryService,
    public dateUtils: DateUtils) { }

  ngOnInit() {}

  async removeSurgicalPathologyConfirm(pathology: SurgicalPathology) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove surgical pathology report?',
      subHeader: 'Are you sure you want to remove this surgical pathology report?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.surgicalPathologyList.closeSlidingItems();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.surgicalPathologyList.closeSlidingItems();
            this.removeSurgicalPathology(pathology);
          }
        }
      ]
    });
    await confirm.present();
  }

  removeSurgicalPathology(pathology: SurgicalPathology) {
    this.surgerySvc.removeSurgicalPathology(pathology, this.patient).then((patient) => {
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

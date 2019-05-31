import { Component, OnInit } from '@angular/core';
import { AlertController, Events, NavController } from '@ionic/angular';
import { SurgeryService } from '../../services/surgery.service';
import { Patient } from '../../models/patient';
import { Surgery } from '../../models/surgery';
import { DateUtils } from '../../common/dateutils';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-scheduled-surgery',
  templateUrl: './scheduled-surgery.page.html',
  styleUrls: ['./scheduled-surgery.page.scss'],
})
export class ScheduledSurgeryPage implements OnInit {
  patient: Patient = new Patient();
  surgery: Surgery = new Surgery(); // pass in existing surgery details, if this is for an update
  scheduledDate: string;
  completedDate: string;

  constructor(public navCtrl: NavController, 
    public surgerySvc: SurgeryService,
    public patientSvc: PatientService,
    public events: Events,
    public dateUtils: DateUtils,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientSvc.getPatient(patientId).then((patient) => {
      this.patient = patient;
    });

    let surgeryId = this.route.snapshot.paramMap.get('surgeryId');
    if (surgeryId != null) {
      this.surgerySvc.getSurgery(surgeryId).then((surgery) => {
        this.surgery = surgery;
        this.scheduledDate = this.dateUtils.isoStringToYyyymmdd(this.surgery.scheduledDate);
        if (this.surgery.completedDate != null) {
          this.completedDate = this.dateUtils.isoStringToYyyymmdd(this.surgery.completedDate);
        }
      });
    }
  }

  submit() {
    if (this.scheduledDate != null) {
      this.surgery.scheduledDate = this.dateUtils.yyyymmddToISOString(this.scheduledDate);
    }
    if (this.completedDate != null) {
      this.surgery.completedDate = this.dateUtils.yyyymmddToISOString(this.completedDate);
    }
    this.surgerySvc.save(this.patient, this.surgery).then((resp) => {
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

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      header: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }

}


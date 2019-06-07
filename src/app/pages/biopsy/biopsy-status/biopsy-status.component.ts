import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Events } from '@ionic/angular';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { BiopsyStatusEnum } from 'src/app/enums/biopsy-status-enum';
import { Biopsy } from 'src/app/models/biopsy';

@Component({
  selector: 'app-biopsy-status',
  templateUrl: './biopsy-status.component.html',
  styleUrls: ['./biopsy-status.component.scss'],
})
export class BiopsyStatusComponent implements OnInit {
  patient: Patient;
  biopsyStatus: BiopsyStatusEnum;

  // for template
  biopsyStatusEnum = BiopsyStatusEnum;

  constructor(public navCtrl: NavController, 
    public patientSvc: PatientService,
    public events: Events,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    // existing patient
    if (patientId != null) {
      this.patientSvc.getPatient(patientId).then(patient => {
        this.patient = patient;
        if (this.patient.biopsy != null) {
          this.biopsyStatus = this.patient.biopsy.status;
        }
      });
    }
    else {
      this.patient = new Patient();
    }
  }

  save() {
    if (this.patient != null) {
      if (this.patient.biopsy == null) {
        this.patient.biopsy = new Biopsy();
      }
      this.patient.biopsy.status = this.biopsyStatus;
    }

    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      console.log("patient saved");
      this.events.publish('patientSaved');
      this.navigateToChild(this.patient.biopsy.status);
    })
    .catch(error => {
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

  navigateToChild(biopsyStatus: BiopsyStatusEnum) {
    switch (biopsyStatus) {
      case BiopsyStatusEnum.Completed:
        // it'd be nice to have relative rather than absolute urls here, but doesn't seem to work
        this.navCtrl.navigateForward('/biopsy/' + this.patient._id + '/completed-biopsy');
        break;
      case BiopsyStatusEnum.Scheduled:
        this.navCtrl.navigateForward('/biopsy/' + this.patient._id + '/scheduled-biopsy');
        break;
      case BiopsyStatusEnum.NotScheduled: 
        this.navCtrl.navigateForward('/biopsy/' + this.patient._id + '/biopsy-not-scheduled');
        break;
      case BiopsyStatusEnum.NotIndicated:
        this.navCtrl.navigateForward('/biopsy/' + this.patient._id + '/completed-biopsy');
        break;
      default: 
        // do nothing
    }
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

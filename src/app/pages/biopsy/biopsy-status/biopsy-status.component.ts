import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Events } from '@ionic/angular';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { BiopsyStatusEnum } from 'src/app/enums/biopsy-status-enum';
import { Biopsy } from 'src/app/models/biopsy';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { BiopsyNotIndicated } from 'src/app/models/biopsy-not-indicated';
import { BiopsyNotScheduled } from 'src/app/models/biopsy-not-scheduled';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-biopsy-status',
  templateUrl: './biopsy-status.component.html',
  styleUrls: ['./biopsy-status.component.scss'],
})
export class BiopsyStatusComponent implements OnInit {
  patient: Patient;

  // for template
  biopsyStatusEnum = BiopsyStatusEnum;

  constructor(public navCtrl: NavController, 
    public patientSvc: PatientService,
    public biopsySvc: BiopsyService,
    public events: Events,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public dateUtils: DateUtils) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientSvc.getPatient(patientId).then(patient => {
      this.patient = patient;
      if (this.patient.biopsy == null) {
        this.patient.biopsy = new Biopsy();
      }
      if (this.patient.biopsy.notIndicated == null) {
        this.patient.biopsy.notIndicated = new BiopsyNotIndicated();
      }
      if (this.patient.biopsy.notScheduled == null) {
        this.patient.biopsy.notScheduled = new BiopsyNotScheduled();
      }
    });
  }

  save() {
    if (this.patient != null) {
      switch (this.patient.biopsy.status) {
        case BiopsyStatusEnum.NotIndicated:
          this.biopsySvc.saveBiopsyNotIndicated(this.patient).then(patient => {
            console.log("patient saved");
            this.events.publish('patientSaved');
            this.navCtrl.navigateBack('/patient/' + this.patient._id);
          });
          break;
        case BiopsyStatusEnum.NotScheduled:
          this.biopsySvc.saveBiopsyNotScheduled(this.patient).then(patient => {
            console.log("patient saved");
            this.events.publish('patientSaved');
            this.navCtrl.navigateBack('/patient/' + this.patient._id);
          });
          break;
        default: 
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
    }
  }

  navigateToChild(biopsyStatus: BiopsyStatusEnum) {
    switch (biopsyStatus) {
      case BiopsyStatusEnum.Completed:
        // TODO: it'd be nice to have relative rather than absolute urls here
        this.navCtrl.navigateForward('/patient/' + this.patient._id + '/biopsy/completed-biopsy');
        break;
      case BiopsyStatusEnum.Scheduled:
        this.navCtrl.navigateForward('/patient/' + this.patient._id + '/biopsy/scheduled-biopsy');
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

  // reset any fields
  statusChange() {
    if (this.patient.biopsy.status != BiopsyStatusEnum.NotScheduled) {
      this.patient.biopsy.notScheduled.reason = null;
      this.patient.biopsy.notScheduled.dateRecorded = null;
    }
    if (this.patient.biopsy.status != BiopsyStatusEnum.NotIndicated) {
      this.patient.biopsy.notIndicated.reason = null;
      this.patient.biopsy.notIndicated.dateRecorded = null;
    }
  }

}

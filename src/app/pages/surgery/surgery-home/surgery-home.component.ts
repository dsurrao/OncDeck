import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Surgery } from 'src/app/models/surgery';
import { ScheduledSurgery } from 'src/app/models/scheduled-surgery';
import { SurgeryNotIndicated } from 'src/app/models/surgery-not-indicated';
import { SurgeryNotScheduled } from 'src/app/models/surgery-not-scheduled';
import { SurgeryStatusEnum } from 'src/app/enums/surgery-status-enum';
import { SurgeryNotIndicatedReasonEnum } from 'src/app/enums/surgery-not-indicated-reason-enum';
import { DateUtils } from 'src/app/common/dateutils';
import { SurgeryService } from 'src/app/services/surgery.service';
import { Events, NavController } from '@ionic/angular';

@Component({
  selector: 'app-surgery-home',
  templateUrl: './surgery-home.component.html',
  styleUrls: ['./surgery-home.component.scss'],
})
export class SurgeryHomeComponent implements OnInit {
  patientId: string; // from url
  patient: Patient;

  // for use in template
  surgeryStatusEnum = SurgeryStatusEnum;
  surgeryNotIndicatedReasonEnum = SurgeryNotIndicatedReasonEnum;

  constructor(public patientSvc: PatientService,
    public surgerySvc: SurgeryService,
    public route: ActivatedRoute, 
    public dateUtils: DateUtils,
    public events: Events,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;
      if (this.patient.surgery == null) {
        this.patient.surgery = new Surgery();
        this.patient.surgery.completedSurgeries = [];
        this.patient.surgery.scheduledSurgery = new ScheduledSurgery();
        this.patient.surgery.surgeryNotIndicated = new SurgeryNotIndicated();
        this.patient.surgery.surgeryNotScheduled = new SurgeryNotScheduled();
      }
    });
  }

  update() {
    this.surgerySvc.saveSurgeryStatus(this.patient).then(patient => {
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('/patient/' + this.patientId);
    })
  }
}

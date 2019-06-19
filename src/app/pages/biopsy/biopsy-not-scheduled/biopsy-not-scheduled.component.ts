import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { Events, NavController } from '@ionic/angular';
import { Biopsy } from 'src/app/models/biopsy';
import { BiopsyNotScheduled } from 'src/app/models/biopsy-not-scheduled';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-biopsy-not-scheduled',
  templateUrl: './biopsy-not-scheduled.component.html',
  styleUrls: ['./biopsy-not-scheduled.component.scss'],
})
export class BiopsyNotScheduledComponent implements OnInit {

  // url param
  patientId: string;

  patient: Patient;

  constructor(public patientSvc: PatientService,
    public biopsySvc: BiopsyService,
    public route: ActivatedRoute,
    public events: Events,
    public navCtrl: NavController,
    public dateUtils: DateUtils) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;
      if (this.patient.biopsy == null) {
        this.patient.biopsy = new Biopsy();
      }
      if (this.patient.biopsy.notScheduled == null) {
        this.patient.biopsy.notScheduled = new BiopsyNotScheduled();
      }
    });
  }

  save() {
    this.biopsySvc.saveBiopsyNotScheduled(this.patient).then(patient => {
      // TODO: make 'patientSaved' a global variable
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('patient/' + this.patientId);
    })
  }

}

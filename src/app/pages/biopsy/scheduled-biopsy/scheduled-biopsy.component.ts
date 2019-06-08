import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiopsyTypeEnum } from 'src/app/enums/biopsy-type-enum';
import { Patient } from 'src/app/models/patient';
import { Biopsy } from 'src/app/models/biopsy';
import { BiopsyType } from 'src/app/models/biopsy-type';
import { PatientService } from 'src/app/services/patient.service';
import { ScheduledBiopsy } from 'src/app/models/scheduled-biopsy';
import { NavController, Events } from '@ionic/angular';

@Component({
  selector: 'app-scheduled-biopsy',
  templateUrl: './scheduled-biopsy.component.html',
  styleUrls: ['./scheduled-biopsy.component.scss'],
})
export class ScheduledBiopsyComponent implements OnInit {
  patient: Patient;

  // for use in template
  biopsyTypeEnum = BiopsyTypeEnum;

  constructor(public route: ActivatedRoute, 
    public patientSvc: PatientService,
    public navCtrl: NavController,
    public events: Events) { }

  ngOnInit() {
    this.patientSvc.getPatient(this.route.snapshot.paramMap.get('patientId')).then(patient => {
      this.patient = patient;
      if (this.patient.biopsy == null) {
        this.patient.biopsy = new Biopsy();
      }
      if (this.patient.biopsy.scheduledBiopsy == null) {
        this.patient.biopsy.scheduledBiopsy = new ScheduledBiopsy();
      }
      if (this.patient.biopsy.scheduledBiopsy.biopsyType == null) {
        this.patient.biopsy.scheduledBiopsy.biopsyType = new BiopsyType();
      }
    });
  }

  save() {
    this.patientSvc.savePatient(this.patient).then(updatedPatient => {
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('patient/' + this.patient._id);
    });
  }

}

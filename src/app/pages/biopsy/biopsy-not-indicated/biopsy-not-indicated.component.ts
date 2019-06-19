import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { Events, NavController } from '@ionic/angular';
import { Biopsy } from 'src/app/models/biopsy';
import { BiopsyNotIndicated } from 'src/app/models/biopsy-not-indicated';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-biopsy-not-indicated',
  templateUrl: './biopsy-not-indicated.component.html',
  styleUrls: ['./biopsy-not-indicated.component.scss'],
})
export class BiopsyNotIndicatedComponent implements OnInit {

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
      if (this.patient.biopsy.notIndicated == null) {
        this.patient.biopsy.notIndicated = new BiopsyNotIndicated();
      }
    });
  }

  save() {
    this.biopsySvc.saveBiopsyNotIndicated(this.patient).then(patient => {
      // TODO: make 'patientSaved' a global variable
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('patient/' + this.patientId);
    })
  }

}

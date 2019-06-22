/*
  This component saves the following properties of a completed biopsy:
  procedureDate: string;
  reportDate: string;
  pathologistName: string;
  facility: string;
  type: BiopsyType;
  site: BiopsySite;
  histology: Histology;
*/
import { Component, OnInit } from '@angular/core';
import { BiopsyTypeEnum } from 'src/app/enums/biopsy-type-enum';
import { BiopsySideEnum } from 'src/app/enums/biopsy-side-enum';
import { LymphNodeEnum } from 'src/app/enums/lymph-node-enum';
import { BiopsyTissueEnum } from 'src/app/enums/biopsy-tissue-enum';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { Events, NavController } from '@ionic/angular';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { PatientService } from 'src/app/services/patient.service';
import { BiopsyType } from 'src/app/models/biopsy-type';
import { BiopsySite } from 'src/app/models/biopsy-site';
import { HistologyEnum } from 'src/app/enums/histology-enum';
import { Histology } from 'src/app/models/histology';

@Component({
  selector: 'app-completed-biopsy',
  templateUrl: './completed-biopsy.component.html',
  styleUrls: ['./completed-biopsy.component.scss'],
})
export class CompletedBiopsyComponent implements OnInit {
  // input url params
  patientId: string;
  completedBiopsyId: string;

  patient: Patient;
  completedBiopsy: CompletedBiopsy;

  // enums for template
  biopsyTypeEnum = BiopsyTypeEnum;
  biopsySideEnum = BiopsySideEnum;
  lymphNodeEnum = LymphNodeEnum;
  histologyEnum = HistologyEnum;
  tissueEnum = BiopsyTissueEnum;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public patientSvc: PatientService,
    public biopsySvc: BiopsyService,
    public events: Events,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.completedBiopsyId = this.route.snapshot.paramMap.get('completedBiopsyId');

    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;

      if (this.completedBiopsyId != null) {
        for (let b of this.patient.biopsy.completedBiopsies) {
          if (b.id === this.completedBiopsyId) {
            this.completedBiopsy = b;
            break;
          }
        }
      }
      else {
        this.completedBiopsy = new CompletedBiopsy();
        this.completedBiopsy.type = new BiopsyType();
        this.completedBiopsy.site = new BiopsySite();
        this.completedBiopsy.histology = new Histology();
      }
    });
  }

  save() {
    this.biopsySvc.saveCompletedBiopsy(this.completedBiopsy, this.patient).then(completedBiopsyId => {
      let currentPath: string = this.router.url;
      this.events.publish('patientSaved');

      // if this was a newly generated biopsy report, append it to the url
      if (this.completedBiopsyId == null) {
        this.completedBiopsyId = completedBiopsyId;
        currentPath += '/' + this.completedBiopsyId;
      }
      this.navCtrl.navigateForward(currentPath + '/receptors');
    });
  }
}

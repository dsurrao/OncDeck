/*
  This component saves the following properties of a completed biopsy:
  procedureDate: string;
  reportDate: string;
  pathologistName: string;
  facility: string;
  type: BiopsyType;
  site: BiopsySite;
  histology: BiopsyHistology;
*/
import { Component, OnInit } from '@angular/core';
import { BiopsyTypeEnum } from 'src/app/enums/biopsy-type-enum';
import { BiopsySideEnum } from 'src/app/enums/biopsy-side-enum';
import { LymphNodeEnum } from 'src/app/enums/lymph-node-enum';
import { BiopsyHistologyEnum } from 'src/app/enums/biopsy-histology-enum';
import { BiopsyTissueEnum } from 'src/app/enums/biopsy-tissue-enum';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute } from '@angular/router';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { Events, NavController } from '@ionic/angular';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { PatientService } from 'src/app/services/patient.service';
import { BiopsyType } from 'src/app/models/biopsy-type';
import { BiopsySite } from 'src/app/models/biopsy-site';
import { BiopsyHistology } from 'src/app/models/biopsy-histology';
import { BiopsyFeatures } from 'src/app/models/biopsy-features';

@Component({
  selector: 'app-completed-biopsy',
  templateUrl: './completed-biopsy.component.html',
  styleUrls: ['./completed-biopsy.component.scss'],
})
export class CompletedBiopsyComponent implements OnInit {
  // input url params
  patientId: string;
  biopsyId: string;

  patient: Patient;
  completedBiopsy: CompletedBiopsy;

  // enums for template
  biopsyTypeEnum: BiopsyTypeEnum;
  biopsySideEnum: BiopsySideEnum;
  lymphNodeEnum: LymphNodeEnum;
  histologyEnum: BiopsyHistologyEnum;
  tissueEnum: BiopsyTissueEnum;

  constructor(public route: ActivatedRoute,
    public patientSvc: PatientService,
    public biopsySvc: BiopsyService,
    public events: Events,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.biopsyId = this.route.snapshot.paramMap.get('biopsyId');

    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;

      // TODO: remove after testing. for now, just stick to one completed biopsy
      if (this.patient.biopsy != null && this.patient.biopsy.completedBiopsies != null) {
        this.completedBiopsy = this.patient.biopsy.completedBiopsies[0];
      }

      if (this.biopsyId != null) {
        for (let b of this.patient.biopsy.completedBiopsies) {
          if (b.id === this.biopsyId) {
            this.completedBiopsy = b;
            break;
          }
        }
      }
      else {
        this.completedBiopsy = new CompletedBiopsy();
        this.completedBiopsy.type = new BiopsyType();
        this.completedBiopsy.site = new BiopsySite();
        this.completedBiopsy.histology = new BiopsyHistology();
      }
    });
  }

  save() {
    this.biopsySvc.saveCompletedBiopsy(this.patient, this.completedBiopsy).then(patient => {
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('patient/' + this.patientId);
    });
  }
}

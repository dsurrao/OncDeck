import { Component, OnInit } from '@angular/core';
import { LVIEnum } from 'src/app/enums/lvi-enum';
import { GradeEnum } from 'src/app/enums/grade-enum';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute } from '@angular/router';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { Events, NavController } from '@ionic/angular';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { PatientService } from 'src/app/services/patient.service';
import { Features } from 'src/app/models/features';

@Component({
  selector: 'app-completed-biopsy-features',
  templateUrl: './completed-biopsy-features.component.html',
  styleUrls: ['./completed-biopsy-features.component.scss'],
})
export class CompletedBiopsyFeaturesComponent implements OnInit {
  // input url params
  patientId: string;
  completedBiopsyId: string;

  patient: Patient;
  completedBiopsy: CompletedBiopsy;

  // for use in template
  gradeEnum = GradeEnum;
  lviEnum = LVIEnum;

  constructor(public route: ActivatedRoute,
    public patientSvc: PatientService,
    public biopsySvc: BiopsyService,
    public events: Events,
    public navCtrl: NavController) { }

    ngOnInit() {
      this.patientId = this.route.snapshot.paramMap.get('patientId');
      this.completedBiopsyId = this.route.snapshot.paramMap.get('completedBiopsyId');
  
      this.patientSvc.getPatient(this.patientId).then(patient => {
        this.patient = patient;
  
        for (let b of this.patient.biopsy.completedBiopsies) {
          if (b.id === this.completedBiopsyId) {
            this.completedBiopsy = b;
            break;
          }
        }
        
        if (this.completedBiopsy.features == null) {
          this.completedBiopsy.features = new Features();
        }
      });
    }
  
    save() {
      this.biopsySvc.saveCompletedBiopsy(this.completedBiopsy, this.patient).then(completedBiopsyId => {
        this.events.publish('patientSaved');
        this.navCtrl.navigateBack('patient/' + this.patientId);
      });
    }

}

import { Component, OnInit } from '@angular/core';
import { ReceptorStatusEnum } from 'src/app/enums/receptor-status-enum';
import { ReceptorStrengthEnum } from 'src/app/enums/receptor-strength-enum';
import { Her2TestingMethodEnum } from 'src/app/enums/her2-testing-method-enum';
import { Patient } from 'src/app/models/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { CompletedBiopsy } from 'src/app/models/completed-biopsy';
import { Events, NavController } from '@ionic/angular';
import { BiopsyService } from 'src/app/services/biopsy.service';
import { PatientService } from 'src/app/services/patient.service';
import { Receptors } from 'src/app/models/receptors';
import { EstrogenReceptor } from 'src/app/models/er-receptor';
import { ProgesteroneReceptor } from 'src/app/models/pr-receptor';
import { Her2Receptor } from 'src/app/models/her2-receptor';

@Component({
  selector: 'app-completed-biopsy-receptors',
  templateUrl: './completed-biopsy-receptors.component.html',
  styleUrls: ['./completed-biopsy-receptors.component.scss'],
})
export class CompletedBiopsyReceptorsComponent implements OnInit {

  // input url params
  patientId: string;
  completedBiopsyId: string;

  patient: Patient;
  completedBiopsy: CompletedBiopsy;

  // for use in templates
  receptorStatusEnum = ReceptorStatusEnum;
  receptorStrengthEnum = ReceptorStrengthEnum;
  her2TestingMethodEnum = Her2TestingMethodEnum;

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
  
        for (let b of this.patient.biopsy.completedBiopsies) {
          if (b.id === this.completedBiopsyId) {
            this.completedBiopsy = b;
            break;
          }
        }
        
        if (this.completedBiopsy.receptors == null) {
          this.completedBiopsy.receptors = new Receptors();
          this.completedBiopsy.receptors.er = new EstrogenReceptor();
          this.completedBiopsy.receptors.pr = new ProgesteroneReceptor();
          this.completedBiopsy.receptors.her2 = new Her2Receptor();
        }
      });
    }
  
    save() {
      this.biopsySvc.saveCompletedBiopsy(this.completedBiopsy, this.patient).then(completedBiopsyId => {
        // strip out last part of path
        let currentPath: string = this.router.url.replace(/\/[^\/]+$/, "");
        this.events.publish('patientSaved');
        this.navCtrl.navigateForward(currentPath + '/features');
      });
    }

    // reset fields if relatives deselected
    erChange() {
      if (this.completedBiopsy.receptors.er.status == ReceptorStatusEnum.None) {
        this.completedBiopsy.receptors.er.strength = null;
      }
    }

    prChange() {
      if (this.completedBiopsy.receptors.pr.status == ReceptorStatusEnum.None) {
        this.completedBiopsy.receptors.pr.strength = null;
      }
    }

    her2Change() {
      if (this.completedBiopsy.receptors.her2.status == ReceptorStatusEnum.None) {
        this.completedBiopsy.receptors.her2.testingMethod = null;
      }
    }
}

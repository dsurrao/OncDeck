import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';
import { ActivatedRoute } from '@angular/router';
import { DateUtils } from 'src/app/common/dateutils';
import { Patient } from 'src/app/models/patient';
import { CompletedSurgery } from 'src/app/models/completed-surgery';
import { SurgicalPathology } from 'src/app/models/surgical-pathology';
import { EstrogenReceptor } from 'src/app/models/er-receptor';
import { ProgesteroneReceptor } from 'src/app/models/pr-receptor';
import { Her2Receptor } from 'src/app/models/her2-receptor';
import { Features } from 'src/app/models/features';
import { SurgicalPathologyStatusEnum } from 'src/app/enums/surgical-pathology-status-enum';
import { HistologyEnum } from 'src/app/enums/histology-enum';
import { ReceptorStatusEnum } from 'src/app/enums/receptor-status-enum';
import { LVIEnum } from 'src/app/enums/lvi-enum';
import { GradeEnum } from 'src/app/enums/grade-enum';
import { SurgicalMarginEnum } from 'src/app/enums/surgical-margin-enum';
import { Events, NavController } from '@ionic/angular';
import { SurgeryTypeEnum } from 'src/app/enums/surgery-type-enum';

@Component({
  selector: 'app-completed-surgery',
  templateUrl: './completed-surgery.component.html',
  styleUrls: ['./completed-surgery.component.scss'],
})
export class CompletedSurgeryComponent implements OnInit {
  // url params
  patientId: string;
  completedSurgeryId: string;

  patient: Patient;
  surgery: CompletedSurgery;

  surgicalPathologyStatusEnum = SurgicalPathologyStatusEnum;
  histologyEnum = HistologyEnum;
  erStatusEnum = ReceptorStatusEnum;
  prStatusEnum = ReceptorStatusEnum;
  her2StatusEnum = ReceptorStatusEnum;
  lviEnum = LVIEnum;
  gradeEnum = GradeEnum;
  surgicalMarginEnum = SurgicalMarginEnum;
  surgeryTypeEnum = SurgeryTypeEnum;

  constructor(public patientSvc: PatientService,
    public surgerySvc: SurgeryService,
    public route: ActivatedRoute,
    public dateUtils: DateUtils,
    public events: Events,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.completedSurgeryId = this.route.snapshot.paramMap.get('completedSurgeryId');
    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;
      if (this.completedSurgeryId != null) {
        for (let s of this.patient.surgery.completedSurgeries) {
          if (s.id === this.completedSurgeryId) {
            this.surgery = s;
            break;
          }
        }
      }
      else {
        this.surgery = new CompletedSurgery();
      }
      if (this.surgery.pathology == null) {
        this.surgery.pathology = new SurgicalPathology();
        this.surgery.pathology.er = new EstrogenReceptor();
        this.surgery.pathology.pr = new ProgesteroneReceptor();
        this.surgery.pathology.her2 = new Her2Receptor();
        this.surgery.pathology.features = new Features();
      }
    });
  }

  save() {
    this.surgerySvc.saveCompletedSurgery(this.surgery, this.patient).then(patient => {
      this.events.publish('patientSaved');
      this.navCtrl.navigateBack('/patient/' + this.patientId + '?tab=surgery');
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Surgery } from 'src/app/models/surgery';
import { SurgeryNotIndicated } from 'src/app/models/surgery-not-indicated';
import { SurgeryNotIndicatedReasonEnum } from 'src/app/enums/surgery-not-indicated-reason-enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-not-indicated-surgery',
  templateUrl: './not-indicated-surgery.component.html',
  styleUrls: ['./not-indicated-surgery.component.scss'],
})
export class NotIndicatedSurgeryComponent implements OnInit {
  patient: Patient;

  surgeryNotIndicatedReasonEnum = SurgeryNotIndicatedReasonEnum;

  constructor(public patientSvc: PatientService,
    public route: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientSvc.getPatient(this.route.snapshot.paramMap.get('patientId')).then(patient => {
      this.patient = patient;

      if (this.patient.surgery == null) {
        this.patient.surgery = new Surgery();
      }
      if (this.patient.surgery.surgeryNotIndicated == null) {
        this.patient.surgery.surgeryNotIndicated = new SurgeryNotIndicated();
      }
    });
  }

  save() {
    this.patientSvc.savePatient(this.patient).then(patient => {
      this.navCtrl.navigateBack('/patient/' + this.patient._id + '?tab=surgery');
    });
  }

  cancel() {
    this.navCtrl.navigateBack('/patient/' + this.patient._id + '?tab=surgery');
  }
}

import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Surgery } from 'src/app/models/surgery';
import { SurgeryNotScheduled } from 'src/app/models/surgery-not-scheduled';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-not-scheduled-surgery',
  templateUrl: './not-scheduled-surgery.component.html',
  styleUrls: ['./not-scheduled-surgery.component.scss'],
})
export class NotScheduledSurgeryComponent implements OnInit {
  patient: Patient;

  constructor(public patientSvc: PatientService,
    public route: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientSvc.getPatient(this.route.snapshot.paramMap.get('patientId')).then(patient => {
      this.patient = patient;

      if (this.patient.surgery == null) {
        this.patient.surgery = new Surgery();
      }
      if (this.patient.surgery.surgeryNotScheduled == null) {
        this.patient.surgery.surgeryNotScheduled = new SurgeryNotScheduled();
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

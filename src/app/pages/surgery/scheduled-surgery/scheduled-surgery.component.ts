import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Surgery } from 'src/app/models/surgery';
import { ScheduledSurgery } from 'src/app/models/scheduled-surgery';
import { NavController } from '@ionic/angular';
import { SurgeryService } from 'src/app/services/surgery.service';

@Component({
  selector: 'app-scheduled-surgery',
  templateUrl: './scheduled-surgery.component.html',
  styleUrls: ['./scheduled-surgery.component.scss'],
})
export class ScheduledSurgeryComponent implements OnInit {
  patient: Patient;

  constructor(public patientSvc: PatientService,
    public surgerySvc: SurgeryService,
    public route: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.patientSvc.getPatient(this.route.snapshot.paramMap.get('patientId')).then(patient => {
      this.patient = patient;
      
      if (this.patient.surgery == null) {
        this.patient.surgery = new Surgery();
      }
      if (this.patient.surgery.scheduledSurgery == null) {
        this.patient.surgery.scheduledSurgery = new ScheduledSurgery();
      }
    });
  }

  save() {
    this.surgerySvc.saveScheduledSurgery(this.patient.surgery.scheduledSurgery, 
      this.patient).then(patient => {
      this.navCtrl.navigateBack('/patient/' + this.patient._id + '?tab=surgery');
    });
  }

  cancel() {
    this.navCtrl.navigateBack('/patient/' + this.patient._id + '?tab=surgery');
  }
}

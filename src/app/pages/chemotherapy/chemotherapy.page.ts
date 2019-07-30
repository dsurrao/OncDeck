import { Component, OnInit } from '@angular/core';
import { Chemotherapy } from 'src/app/models/chemotherapy';
import { ChemotherapyService } from 'src/app/services/chemotherapy.service';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Events, NavController } from '@ionic/angular';

@Component({
  selector: 'app-chemotherapy',
  templateUrl: './chemotherapy.page.html',
  styleUrls: ['./chemotherapy.page.scss'],
})
export class ChemotherapyPage implements OnInit {

  patient: Patient;
  patientId: string;
  chemotherapy: Chemotherapy;
  chemotherapyId: string;

  constructor(
    public route: ActivatedRoute,
    public chemotherapySvc: ChemotherapyService,
    public patientSvc: PatientService,
    public events: Events,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.chemotherapyId = this.route.snapshot.paramMap.get('chemotherapyId');
    this.chemotherapy = new Chemotherapy();

    // get patient's chemotherapy information
    this.patientSvc.getPatient(this.patientId).then(patient => {
      this.patient = patient;

      // chemotherapy has already been created
      if (this.chemotherapyId != null) {
        this.chemotherapy = this.patient.chemotherapies.find(r => {
          return r.id === this.chemotherapyId
        });
      }

      // chemotherapy has not been created - initialize
      else {
        this.chemotherapy.regimen = "";
        this.chemotherapy.startDate = "";
        this.chemotherapy.plannedCycles = "";
        this.chemotherapy.actualEndDate = "";
        this.chemotherapy.calculatedEndDate = "";
      }
    });

  }

  save() {
    // now save to db
    this.chemotherapySvc.saveChemotherapy(this.chemotherapy, this.patient).then(id => {
      this.events.publish('chemotherapy saved');
      this.navCtrl.navigateBack('patient/' + this.patientId);
    })
  }

}

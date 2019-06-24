import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Patient } from '../../models/patient';

@Component({
  selector: 'patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss'],
})
export class PatientSummaryComponent implements OnInit {

  @Input('patient') patient: Patient;
  patientDemographics: string;

  constructor() { }

  ngOnInit() {
    this.populateComponent(this.patient);
  }

  populateComponent(pt: Patient) {
    this.patientDemographics = this.constructPatientDemographics(pt);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      if (propName == "patient") {
        let changedProp = changes[propName];
        this.populateComponent(changedProp.currentValue);
        break;
      }
    }
  }

  constructPatientDemographics(patient: Patient): string {
    return patient.firstName + ' ' + patient.lastName
    + ' (' + patient.gender + ', ' + patient.dob + ')';
  }
}

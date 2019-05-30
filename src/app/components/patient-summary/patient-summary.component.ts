import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Patient } from '../../models/patient';
import { SurgicalPathology } from '../../models/surgical-pathology';

@Component({
  selector: 'patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss'],
})
export class PatientSummaryComponent implements OnInit {

  @Input('patient') patient: Patient;
  patientDemographics: string;
  surgicalPathologySummary: string;
  surgerySummary: string;

  constructor() { }

  ngOnInit() {
    this.populateComponent(this.patient);
  }

  populateComponent(pt: Patient) {
    this.patientDemographics = this.constructPatientDemographics(pt);
    this.surgicalPathologySummary = this.constructSurgicalPathologySummary(pt);
    this.surgerySummary = this.constructSurgerySummary(pt);
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

  constructSurgerySummary(patient: Patient): string {
    let surgerySummary = "Surgery: ";
    let surgeries = patient.surgeries != null ? patient.surgeries : [];
    if (surgeries.length > 0) {
      if (surgeries[0].completedDate != null) {
        surgerySummary = "Surgery completed on " + new Date(surgeries[0].completedDate).toLocaleDateString()
        + " at " + surgeries[0].facility + " with " + surgeries[0].providerName;
      }
      else if (surgeries[0]['ScheduledDate'] != null) {
        surgerySummary = "Surgery scheduled on " + new Date(surgeries[0].scheduledDate).toLocaleDateString()
        + " at " + surgeries[0].facility + " with " + surgeries[0].providerName;
      }
    }
    else {
      surgerySummary += "Surgery not scheduled";
    }
    return (surgerySummary);
  }

  constructSurgicalPathologySummary(patient: Patient): string {
    let pathologySummary = 'Surgical Pathology: ';
    let pathologies = patient.surgicalPathologies != null ? patient.surgicalPathologies : [];

    if (pathologies.length > 0) {
      let pathology: SurgicalPathology = pathologies[0];
      pathologySummary += 'Date: ' + new Date(pathology.surgeryDate).toLocaleDateString() + ', '
        + 'Type: ' + pathology.surgeryType + ', ' 
        + 'Histology: ' + pathology.surgeryHistology + ', ' 
        + 'PR: ' + pathology.prReceptor + ', ' 
        + 'ER: ' + pathology.erReceptor + ', ' 
        + 'HER2: ' + pathology.her2Receptor + ', ' 
        + 'LVI: ' + pathology.surgicalFeature + ', ' 
        + 'Surgical Margins: ' + pathology.surgicalMargin
    }
    else {
      pathologySummary += 'No pathology report';
    }
    return pathologySummary;
  }
}

import { Component, Input } from '@angular/core';

/**
 * Generated class for the PatientSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'patient-summary',
  templateUrl: 'patient-summary.html'
})
export class PatientSummaryComponent {

  @Input('patient') patient: any;
  patientDemographics: string;
  surgicalPathologySummary: string;
  surgerySummary: string;


  constructor() {
    console.log('Hello PatientSummaryComponent Component');
  }

  ngAfterViewInit() {
    this.patientDemographics = this.constructPatientDemographics(this.patient);
    this.surgicalPathologySummary = this.constructSurgicalPathologySummary(this.patient);
    this.surgerySummary = this.constructSurgerySummary(this.patient);
  }

  constructPatientDemographics(patient: any): string {
    return patient['FirstName'] + ' ' + patient['LastName']
    + ' (' + patient['Gender'] + ', ' + patient['DOB'] + ')';
  }

  constructSurgerySummary(patient: any): string {
    let surgerySummary = "Surgery: ";
    let surgeries = patient['Surgeries'] != null ? patient['Surgeries'] : [];
    if (surgeries.length > 0) {
      if (surgeries[0]['CompletedDate'] != null) {
        surgerySummary = "Surgery completed on " + new Date(surgeries[0]['CompletedDate']).toLocaleDateString()
        + " at " + surgeries[0]['Facility'] + " with " + surgeries[0]['ProviderName'];
      }
      else if (surgeries[0]['ScheduledDate'] != null) {
        surgerySummary = "Surgery scheduled on " + new Date(surgeries[0]['ScheduledDate']).toLocaleDateString()
        + " at " + surgeries[0]['Facility'] + " with " + surgeries[0]['ProviderName'];
      }
    }
    else {
      surgerySummary += "Surgery not scheduled";
    }
    return (surgerySummary);
  }

  /* let attrValues = [{'SurgeryType': surgeryType, 
  'SurgeryHistology': surgeryHistology, 
  'ReceptorStatuses': receptorStatuses, 
  'SurgicalFeatures': surgicalFeatures, 
  'SurgicalMargins': surgicalMargins}];
  */
  constructSurgicalPathologySummary(patient: any): string {
    let pathologySummary = 'Pathology: ';
    let pathologies = patient['Pathologies'] != null ? patient['Pathologies'] : [];
    if (pathologies.length > 0) {
      pathologySummary += pathologies[0]['SurgeryType'] + '; '
      + pathologies[0]['SurgeryHistology'] + '; '
      + pathologies[0]['ReceptorStatuses'] + '; '
      + pathologies[0]['SurgicalFeatures'] + '; '
      + pathologies[0]['SurgicalMargins'];
    }
    else {
      pathologySummary += 'No pathology report';
    }
    return pathologySummary;
  }
}

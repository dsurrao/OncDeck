import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

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
export class PatientSummaryComponent implements OnChanges {

  @Input('patient') patient: any;
  patientDemographics: string;
  surgicalPathologySummary: string;
  surgerySummary: string;


  constructor() {
    console.log('Hello PatientSummaryComponent Component');
  }

  ngAfterViewInit() {
    this.populateComponent(this.patient);
  }

  populateComponent(pt: any) {
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
      + this.assembleSummaryText("estrogen", pathologies[0]['EstrogrenReceptor'])
      + this.assembleSummaryText("progesterone", pathologies[0]['ProgesteroneReceptor'])
      + this.assembleSummaryText("he", pathologies[0]['HeReceptor'])
      + this.assembleSummaryText("surgicalFeatures", pathologies[0]['SurgicalFeatures'])
      + this.assembleSummaryText("surgicalMargins", pathologies[0]['SurgicalMargins'])
    }
    else {
      pathologySummary += 'No pathology report';
    }
    return pathologySummary;
  }

  /*
   * Assemble text depending on type/value
   */
  assembleSummaryText(type: string, value: string): string {
    if (type == "estrogen") {
      if (value == "erMinus")
        return "ER-;";
      if (value == "erPlus")
        return "ER+;";
    }

    if (type == "progesterone") {
      if (value == "prMinus")
        return "PR-;";
      if (value == "prPlus")
        return "PR+;";
    }

    if (type == "he") {
      if (value == "herMinus")
        return "HER-;";
      if (value == "herPlus")
        return "HER+;";
    }

    if (type == "surgicalFeatures") {
      if (value == "lviMinus")
        return "LVI-;";
      if (value == "lviPlus")
        return "LVI+;";
    }

    if (type == "surgicalMargins") {
      if (value == "focallyPostive")
        return "Focally Positive";
      if (value == "broadlyPositive")
        return "Broadly Positive";
    }

    return "";
  }
  
}
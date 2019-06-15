import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinical-breast-staging',
  templateUrl: './clinical-breast-staging.page.html',
  styleUrls: ['./clinical-breast-staging.page.scss'],
})
export class ClinicalBreastStagingPage implements OnInit {

  isHideSubRadioButtons: boolean;
  isHideDescription: boolean;
  clinicalOptionText: string;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    console.log(patientId);
    this.isHideSubRadioButtons = true;
    this.isHideDescription = true;
  }

  clickClinicalTumorStage(event) {
    this.isHideDescription = false;
    console.log("value chosen: " + event.detail.value);
    if ((event.detail.value == 'T1')
      || (event.detail.value == 'T1mi')
      || (event.detail.value == 'T1a')
      || (event.detail.value == 'T1b')
      || (event.detail.value == 'T1c')
    )
    {
      this.isHideSubRadioButtons = false;
    }
    else
      this.isHideSubRadioButtons = true;

    if (event.detail.value == 'TX') {
      this.clinicalOptionText = "TX - Primary tumor cannot be assessed";
    }

    if (event.detail.value == 'T0') {
      this.clinicalOptionText = "T0 - No evidence of primary tumor";
    }

    if (event.detail.value == 'Tis(DCIS)') {
      this.clinicalOptionText = "Tis(DCIS) - Ductal carcinoma in situ";
    }

    if (event.detail.value == 'Tis(Paget)') {
      this.clinicalOptionText = "Tis (Paget) - Paget's disease of the nipple NOT associated with invasive carcinoma and/or carcinoma in situ (DCIS) in the underlying breast parenchyma.";
    }

    if (event.detail.value == 'T1') {
      this.clinicalOptionText = "T1 - Tumor < or = 20 mm in greatest dimension";
    }

    if (event.detail.value == 'T1mi') {
      this.clinicalOptionText = "T1mi - Tumor < or = 1 mm in greatest dimension";
    }

    if (event.detail.value == 'T1a') {
      this.clinicalOptionText = "T1a - Tumor > 1 mm but < or = 5 mm in greatest dimension (round any measurement > 1.0-1.9 mm to 2 mm)";
    }

    if (event.detail.value == 'T1b') {
      this.clinicalOptionText = "T1b - Tumor > 5 mm but < or = 10 mm in greatest dimension";
    }

    if (event.detail.value == 'T1c') {
      this.clinicalOptionText = "T1c - Tumor > 10 mm but < or = 20 mm in greatest dimension";
    }

    if (event.detail.value == 'T2') {
      this.clinicalOptionText = "T2 - Tumor > 20 mm but < or = 50 mm in greatest dimension";
    }
  }
}

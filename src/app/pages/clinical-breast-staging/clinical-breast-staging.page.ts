import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinical-breast-staging',
  templateUrl: './clinical-breast-staging.page.html',
  styleUrls: ['./clinical-breast-staging.page.scss'],
})
export class ClinicalBreastStagingPage implements OnInit {

  isHideT1SubRadioButtons: boolean;
  isHideT4SubRadioButtons: boolean;
  isHideDescription: boolean;
  clinicalOptionText: string;
  isFormValid: boolean;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    this.isHideT1SubRadioButtons = true;
    this.isHideT4SubRadioButtons = true;
    this.isHideDescription = true;
    this.isFormValid = false;
  }

  clickClinicalTumorStage(event) {
    this.isHideDescription = false;
    this.isFormValid = true;
    
    /* check value to determine if subradio buttons to be shown for T1 */
    if ((event.detail.value == 'T1')
      || (event.detail.value == 'T1mi')
      || (event.detail.value == 'T1a')
      || (event.detail.value == 'T1b')
      || (event.detail.value == 'T1c')
    ){
      this.isHideT1SubRadioButtons = false;
    }

    /* check value to determine if subradio buttons to be shown for T2 */
    if ((event.detail.value == 'T4')
      || (event.detail.value == 'T4a')
      || (event.detail.value == 'T4b')
      || (event.detail.value == 'T4c')
      || (event.detail.value == 'T4d')
    ){
      this.isHideT4SubRadioButtons = false;  
    }
    else {
      this.isHideT4SubRadioButtons = true;
    }


    /* check radio button value and display description */
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

    if (event.detail.value == 'T3') {
      this.clinicalOptionText = "T3 - Tumor > 50 mm in greatest dimension";
    }

    if (event.detail.value == 'T4') {
      this.clinicalOptionText = "T4 - Tumor of any size with direct extension to the chest wall and/or to the skin (ulceration or skin nodules); invasion of the dermis alone does not qualify as T4";
    }

    if (event.detail.value == 'T4a') {
      this.clinicalOptionText = "T4a - Extension to the chest wall; invasion or adherence to pectoralis muscle in the absecnece of invasion of the chest wall structures does not qualify as T4";
    }

    if (event.detail.value == 'T4b') {
      this.clinicalOptionText = "T4b - Ulceration and/or ipsilateral macroscopic satellite nodules and/or edema (including peau d'orange) of the skin that does not meet the criteria for inflammatory carcinoma";
    }

    if (event.detail.value == 'T4c') {
      this.clinicalOptionText = "T4c - Both T4a and T4b are present";
    }

    if (event.detail.value == 'T4d') {
      this.clinicalOptionText = "T4d - Inflammatory carcinoma";
    }

  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './patient.routing';

import { IonicModule } from '@ionic/angular';

import { PatientPage } from './patient.page';
import { PatientSummaryComponent } from 'src/app/components/patient-summary/patient-summary.component';
import { RadiationTherapyItemsComponent } from './radiation-therapy-items/radiation-therapy-items.component';
import { CompletedBiopsyItemsComponent } from './completed-biopsy-items/completed-biopsy-items.component';
import { ClinicalBreastStagingItemsComponent } from './clinical-breast-staging-items/clinical-breast-staging-items.component';
import { ChemotherapyItemsComponent } from './chemotherapy-items/chemotherapy-items.component';


import { ClinicalBreastStagingPageModule } from '../clinical-breast-staging/clinical-breast-staging.module';
import { BiopsyPageModule } from '../biopsy/biopsy.module';
import { ChemotherapyPageModule } from '../chemotherapy/chemotherapy.module';
import { RadiationTherapyPageModule } from '../radiation-therapy/radiation-therapy.module';
import { SurgeryPageModule } from '../surgery/surgery.module';

import { NgxTimelineModule } from 'ngx-timeline';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    routing,
    ClinicalBreastStagingPageModule,
    BiopsyPageModule,
    ChemotherapyPageModule,
    RadiationTherapyPageModule,
    SurgeryPageModule,
    NgxTimelineModule
  ],
  declarations: [
    PatientPage, 
    PatientSummaryComponent,
    RadiationTherapyItemsComponent,
    CompletedBiopsyItemsComponent,
    ClinicalBreastStagingItemsComponent,
    ChemotherapyItemsComponent,
    TimelineComponent
  ]
})
export class PatientPageModule {}

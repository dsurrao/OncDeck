import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './patient.routing';

import { IonicModule } from '@ionic/angular';

import { PatientPage } from './patient.page';
import { PatientSummaryComponent } from 'src/app/components/patient-summary/patient-summary.component';
import { RadiationTherapyItemsComponent } from './radiation-therapy-items/radiation-therapy-items.component';
import { CompletedBiopsyItemsComponent } from './completed-biopsy-items/completed-biopsy-items.component';
import { BiopsyPageModule } from '../biopsy/biopsy.module';
import { RadiationTherapyPageModule } from '../radiation-therapy/radiation-therapy.module';
import { SurgeryPageModule } from '../surgery/surgery.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    routing,
    BiopsyPageModule,
    RadiationTherapyPageModule,
    SurgeryPageModule
  ],
  declarations: [
    PatientPage, 
    PatientSummaryComponent,
    RadiationTherapyItemsComponent,
    CompletedBiopsyItemsComponent,
  ]
})
export class PatientPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClinicalBreastStagingPage } from './clinical-breast-staging.page';
import { StagingSummaryComponent } from './staging-summary/staging-summary.component';
import { CompletedStagingSummaryComponent } from './completed-staging-summary/completed-staging-summary.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicalBreastStagingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ClinicalBreastStagingPage,
    StagingSummaryComponent,
    CompletedStagingSummaryComponent
  ],
  exports: [
    StagingSummaryComponent,
    CompletedStagingSummaryComponent
  ]
})
export class ClinicalBreastStagingPageModule {}

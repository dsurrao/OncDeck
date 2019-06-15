import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClinicalBreastStagingPage } from './clinical-breast-staging.page';

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
  declarations: [ClinicalBreastStagingPage]
})
export class ClinicalBreastStagingPageModule {}

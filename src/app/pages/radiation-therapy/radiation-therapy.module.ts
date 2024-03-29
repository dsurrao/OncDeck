import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RadiationTherapyPage } from './radiation-therapy.page';
import { RadiationTherapySummaryComponent } from './radiation-therapy-summary/radiation-therapy-summary.component';
import { CompletedRadiationSummaryComponent } from './completed-radiation-summary/completed-radiation-summary.component';

const routes: Routes = [
  {
    path: '', component: RadiationTherapyPage
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
    RadiationTherapyPage,
    RadiationTherapySummaryComponent,
    CompletedRadiationSummaryComponent
  ],
  exports: [
    RadiationTherapySummaryComponent,
    CompletedRadiationSummaryComponent
  ]
})
export class RadiationTherapyPageModule {}

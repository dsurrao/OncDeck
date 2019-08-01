import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChemotherapyPage } from './chemotherapy.page';
import { ChemotherapySummaryComponent } from './chemotherapy-summary/chemotherapy-summary.component';
import { CompletedChemotherapySummaryComponent } from './completed-chemotherapy-summary/completed-chemotherapy-summary.component';

const routes: Routes = [
  {
    path: '',
    component: ChemotherapyPage
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
    ChemotherapyPage,
    ChemotherapySummaryComponent,
    CompletedChemotherapySummaryComponent
  ],
  exports: [
    ChemotherapySummaryComponent,
    CompletedChemotherapySummaryComponent
  ]
})
export class ChemotherapyPageModule {}

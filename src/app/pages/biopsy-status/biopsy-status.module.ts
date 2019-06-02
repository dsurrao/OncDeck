import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BiopsyStatusPage } from './biopsy-status.page';
import { BiopsyStatusComponent } from 'src/app/components/biopsy-status/biopsy-status.component';

const routes: Routes = [
  {
    path: '',
    component: BiopsyStatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BiopsyStatusPage, BiopsyStatusComponent]
})
export class BiopsyStatusPageModule {}

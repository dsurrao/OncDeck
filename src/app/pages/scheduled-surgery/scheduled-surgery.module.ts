import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScheduledSurgeryPage } from './scheduled-surgery.page';
import { ScheduledSurgeryComponent } from 'src/app/components/scheduled-surgery/scheduled-surgery.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduledSurgeryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScheduledSurgeryPage, ScheduledSurgeryComponent]
})
export class ScheduledSurgeryPageModule {}

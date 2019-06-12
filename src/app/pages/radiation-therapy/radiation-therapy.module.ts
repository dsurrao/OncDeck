import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RadiationTherapyPage } from './radiation-therapy.page';

const routes: Routes = [
  {
    path: '',
    component: RadiationTherapyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RadiationTherapyPage]
})
export class RadiationTherapyPageModule {}

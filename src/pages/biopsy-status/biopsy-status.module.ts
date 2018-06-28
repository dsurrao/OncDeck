import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiopsyStatusPage } from './biopsy-status';

@NgModule({
  declarations: [
    BiopsyStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(BiopsyStatusPage),
  ],
})
export class BiopsyStatusPageModule {}

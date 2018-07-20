import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurgeryStatusPage } from './surgery-status';

@NgModule({
  declarations: [
    SurgeryStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(SurgeryStatusPage),
  ],
})
export class SurgeryStatusPageModule {}

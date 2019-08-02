import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SurgeryStatusEnum } from 'src/app/enums/surgery-status-enum';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-surgery-home',
  templateUrl: './surgery-home.component.html',
  styleUrls: ['./surgery-home.component.scss'],
})
export class SurgeryHomeComponent implements OnInit {
  @Input('patient') patient: Patient;
  surgeryStatus: SurgeryStatusEnum;
  updateSurgeryStatusFlag: boolean = false;

  // for use in template
  surgeryStatusEnum = SurgeryStatusEnum;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
  }

  next() {
    // switch off editing mode
    this.updateSurgeryStatusFlag = !this.updateSurgeryStatusFlag;
    switch (this.surgeryStatus) {
      case SurgeryStatusEnum.Completed:
        this.navCtrl.navigateForward('/patient/' + this.patient._id + '/surgery/completed-surgery');
        break;
      case SurgeryStatusEnum.Scheduled:
        this.navCtrl.navigateForward('/patient/' + this.patient._id + '/surgery/scheduled-surgery');
        break;
      case SurgeryStatusEnum.NotScheduled:
        this.navCtrl.navigateForward('/patient/' + this.patient._id + '/surgery/not-scheduled-surgery');
        break;
      case SurgeryStatusEnum.NotIndicated:
        this.navCtrl.navigateForward('/patient/' + this.patient._id + '/surgery/not-indicated-surgery');
        break;
    }
  }

  updateStatus() {
    // switch off editing mode
    this.updateSurgeryStatusFlag = !this.updateSurgeryStatusFlag;
    if (!this.updateSurgeryStatusFlag) {
      this.surgeryStatus = null;
    }
  }
}

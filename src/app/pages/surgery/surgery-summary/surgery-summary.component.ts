import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SurgeryService } from 'src/app/services/surgery.service';
import { SurgeryStatusEnum } from 'src/app/enums/surgery-status-enum';
import { CompletedSurgery } from 'src/app/models/completed-surgery';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-surgery-summary',
  templateUrl: './surgery-summary.component.html',
  styleUrls: ['./surgery-summary.component.scss'],
})
export class SurgerySummaryComponent implements OnInit {
  @Input('patient') patient: Patient;

  mostRecentCompletedSurgery: CompletedSurgery;

  surgeryStatusEnum = SurgeryStatusEnum;

  constructor(public surgerySvc: SurgeryService,
    public dateUtils: DateUtils) { }

  ngOnInit() {
    this.mostRecentCompletedSurgery = this.surgerySvc.getMostRecentCompletedSurgery(this.patient);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-staging-summary',
  templateUrl: './staging-summary.component.html',
  styleUrls: ['./staging-summary.component.scss'],
})
export class StagingSummaryComponent implements OnInit {
  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {}

}

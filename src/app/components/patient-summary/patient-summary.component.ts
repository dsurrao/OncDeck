import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../models/patient';

@Component({
  selector: 'patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss'],
})
export class PatientSummaryComponent implements OnInit {

  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {}
}

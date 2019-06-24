import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-surgery-summary',
  templateUrl: './surgery-summary.component.html',
  styleUrls: ['./surgery-summary.component.scss'],
})
export class SurgerySummaryComponent implements OnInit {
  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {}

}

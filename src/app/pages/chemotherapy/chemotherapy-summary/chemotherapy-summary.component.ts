import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-chemotherapy-summary',
  templateUrl: './chemotherapy-summary.component.html',
  styleUrls: ['./chemotherapy-summary.component.scss'],
})
export class ChemotherapySummaryComponent implements OnInit {
  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {}

}

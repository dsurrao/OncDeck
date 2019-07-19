import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-radiation-therapy-summary',
  templateUrl: './radiation-therapy-summary.component.html',
  styleUrls: ['./radiation-therapy-summary.component.scss'],
})
export class RadiationTherapySummaryComponent implements OnInit {
  @Input('patient') patient: Patient;

  constructor() { }

  ngOnInit() {}

}

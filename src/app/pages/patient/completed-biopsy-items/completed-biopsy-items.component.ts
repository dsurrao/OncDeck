import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'completed-biopsy-items',
  templateUrl: './completed-biopsy-items.component.html',
  styleUrls: ['./completed-biopsy-items.component.scss'],
})
export class CompletedBiopsyItemsComponent implements OnInit {

  @Input('patient') patient: Patient;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}

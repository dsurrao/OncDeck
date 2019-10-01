import { Component, OnInit, Input } from '@angular/core';
import { Chemotherapy } from 'src/app/models/chemotherapy';
import { DateUtils } from 'src/app/common/dateutils';
import { ChemotherapyRegimenEnum } from 'src/app/enums/chemotherapy-regimen-enum';

@Component({
  selector: 'app-completed-chemotherapy-summary',
  templateUrl: './completed-chemotherapy-summary.component.html',
  styleUrls: ['./completed-chemotherapy-summary.component.scss'],
})
export class CompletedChemotherapySummaryComponent implements OnInit {

  @Input('chemotherapy') chemotherapy: Chemotherapy;

  chemotherapyRegimenEnum = ChemotherapyRegimenEnum;
  
  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { DateUtils } from 'src/app/common/dateutils';
import { ChemotherapyRegimenEnum } from 'src/app/enums/chemotherapy-regimen-enum';

@Component({
  selector: 'chemotherapy-items',
  templateUrl: './chemotherapy-items.component.html',
  styleUrls: ['./chemotherapy-items.component.scss'],
})
export class ChemotherapyItemsComponent implements OnInit {

  @Input('patient') patient: Patient;

  chemotherapyRegimenEnum = ChemotherapyRegimenEnum;

  constructor(
    public dateUtils: DateUtils,
  ) { }

  ngOnInit() {
  }

}

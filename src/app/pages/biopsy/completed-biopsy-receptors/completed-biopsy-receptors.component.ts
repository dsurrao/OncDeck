import { Component, OnInit } from '@angular/core';
import { ReceptorStatusEnum } from 'src/app/enums/receptor-status-enum';
import { ReceptorStrengthEnum } from 'src/app/enums/receptor-strength-enum';
import { Her2TestingMethodEnum } from 'src/app/enums/her2-testing-method-enum';

@Component({
  selector: 'app-completed-biopsy-receptors',
  templateUrl: './completed-biopsy-receptors.component.html',
  styleUrls: ['./completed-biopsy-receptors.component.scss'],
})
export class CompletedBiopsyReceptorsComponent implements OnInit {

  // for use in templates
  receptorStatusEnum: ReceptorStatusEnum;
  receptorStrengthEnum: ReceptorStrengthEnum;
  her2TestingMethodEnum: Her2TestingMethodEnum;

  constructor() { }

  ngOnInit() {}

}

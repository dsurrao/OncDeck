import { Component, OnInit, Input } from '@angular/core';
import { RadiationTherapy } from 'src/app/models/radiation-therapy';
import { RadiationFieldEnum } from 'src/app/enums/radiation-field-enum';
import { DateUtils } from 'src/app/common/dateutils';

@Component({
  selector: 'app-completed-radiation-summary',
  templateUrl: './completed-radiation-summary.component.html',
  styleUrls: ['./completed-radiation-summary.component.scss'],
})
export class CompletedRadiationSummaryComponent implements OnInit {

  @Input('radiationTherapy') therapy: RadiationTherapy;

  // for use in template
  radiationFieldEnum = RadiationFieldEnum;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}

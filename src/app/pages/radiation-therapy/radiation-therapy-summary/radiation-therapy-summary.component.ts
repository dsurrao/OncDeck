import { Component, OnInit, Input } from '@angular/core';
import { RadiationTherapy } from 'src/app/models/radiation-therapy';
import { DateUtils } from 'src/app/common/dateutils';
import { RadiationFieldEnum } from 'src/app/enums/radiation-field-enum';

@Component({
  selector: 'app-radiation-therapy-summary',
  templateUrl: './radiation-therapy-summary.component.html',
  styleUrls: ['./radiation-therapy-summary.component.scss'],
})
export class RadiationTherapySummaryComponent implements OnInit {
  @Input('radiationTherapy') therapy: RadiationTherapy;

  // for use in template
  radiationFieldEnum = RadiationFieldEnum;

  constructor(public dateUtils: DateUtils) { }

  ngOnInit() {}

}

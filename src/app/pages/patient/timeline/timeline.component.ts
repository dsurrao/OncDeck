import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { TimelineEvent } from 'ngx-timeline';
import { RadiationFieldTreated } from 'src/app/models/radiation-field-treated';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {

  @Input('patient') patient: Patient;
  // events should be sorted date descending
  events: TimelineEvent[] = [];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    let event: TimelineEvent;

    // TODO: fill in with more data
    // biopsies
    if (this.patient.biopsy != null) {
      if (this.patient.biopsy.scheduledBiopsy != null) {
        if (this.patient.biopsy.scheduledBiopsy.scheduledDate != null) {
          event = {
            'date': new Date(this.patient.biopsy.scheduledBiopsy.scheduledDate),
            'header': 'Scheduled Biopsy',
            'body': 'Biopsy type: ' + this.patient.biopsy.scheduledBiopsy.biopsyType.type + ', '
              + 'Contact person: ' + this.patient.biopsy.scheduledBiopsy.contactPerson + ', '
              + 'Facility: ' + this.patient.biopsy.scheduledBiopsy.facility
          }
          this.events.push(event);
        }
      }
      if (this.patient.biopsy.completedBiopsies != null) {
        for (let b of this.patient.biopsy.completedBiopsies) {
          event = {
            'date': new Date(b.procedureDate),
            'header': 'Completed Biopsy',
            'body': 'Biopsy type: ' + b.type.type
          }
          this.events.push(event);
        }
      }
    }

    // surgeries
    if (this.patient.surgery != null) {
      if (this.patient.surgery.scheduledSurgery != null) {
        if (this.patient.surgery.scheduledSurgery.scheduledDate != null) {
          event = {
            'date': new Date(this.patient.surgery.scheduledSurgery.scheduledDate),
            'header': 'Scheduled Surgery',
            'body': 'Surgeon: ' + this.patient.surgery.scheduledSurgery.surgeonName + ', '
              + 'Facility: ' + this.patient.surgery.scheduledSurgery.facility
          }
          this.events.push(event);
        }
      }
      if (this.patient.surgery.completedSurgeries != null) {
        for (let s of this.patient.surgery.completedSurgeries) {
          event = {
            'date': new Date(s.surgeryDate),
            'header': 'Completed Surgery',
            'body': 'Surgery performed by ' + s.surgeonName
          }
          this.events.push(event);
        }
      }
    }

    // radiation therapies
    if (this.patient.radiationTherapies != null) {
      for (let r of this.patient.radiationTherapies) {
        event = {
          'date': new Date(r.startDate),
          'header': 'Radiation Started',
          'body': this.showFieldsTreated(r.fieldsTreated)
        }
        this.events.push(event);
      }
    }


    // finally sort all events date descending
    this.events.sort((a: TimelineEvent, b: TimelineEvent) => {
      if (a.date < b.date) return 1;
      else if (a.date == b.date) return 0;
      else return -1;
    });
  }

  showFieldsTreated(fields: RadiationFieldTreated[]): string {
    let fieldsTreated: string = '';
    for (let f of fields) {
      fieldsTreated += f.field + ', ';
    }
    return fieldsTreated;
  }
}

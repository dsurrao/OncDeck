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

    // this.events.push({ "date": new Date('1/1/2020'), 
    //   "header": "代码托管服务 GitHub", 
    //   "body": "GitHub可以托管各种git库，并提供一个web界面，但与其它像 SourceForge或Google Code这样的服务不同，GitHub的独特卖点在于从另外一个项目进行分支的简易性。为一个项目贡献代码非常简单：首先点击项目站点的“fork”的按 钮，然后将代码检出并将修改加入到刚才分出的代码库中，最后通过内建的“pull request”机制向项目负责人申请代码合并。"
    // });
    // this.events.push({ "date": new Date(), 
    //   "header": "专为微信设计的 UI 库 WeUI", 
    //   "body": "WeUI 是一套同微信原生视觉体验一致的基础样式库，为微信 Web 开发量身设计，可以令用户的使用感知更加统一。包含button、cell、dialog、toast、article、icon等各式元素。" 
    // });
    // this.events.push({ "date": new Date('1/1/2021'), 
    //   "header": "JavaScript 图表库 ECharts", 
    //   "body": "ECharts是一款由百度前端技术部开发的，基于Javascript的数据可视化图表库，提供直观，生动，可交互，可个性化定制的数据可视化图表。" 
    // });

    // TODO: fill in with more data
    // biopsies
    if (this.patient.biopsy != null) {
      if (this.patient.biopsy.scheduledBiopsy != null) {
        event = {
          'date': new Date(this.patient.biopsy.scheduledBiopsy.scheduledDate),
          'header': 'Scheduled Biopsy',
          'body': 'Biopsy type: ' + this.patient.biopsy.scheduledBiopsy.biopsyType.type + ', '
            + 'Contact person: ' + this.patient.biopsy.scheduledBiopsy.contactPerson + ', '
            + 'Facility: ' + this.patient.biopsy.scheduledBiopsy.facility
        }
        this.events.push(event);
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
        event = {
          'date': new Date(this.patient.surgery.scheduledSurgery.scheduledDate),
          'header': 'Scheduled Surgery',
          'body': 'Surgeon: ' + this.patient.surgery.scheduledSurgery.surgeonName + ', '
            + 'Facility: ' + this.patient.surgery.scheduledSurgery.facility
        }
        this.events.push(event);
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

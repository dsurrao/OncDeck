import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, NavController, NavParams } from '@ionic/angular';
import { PatientListService } from 'src/app/services/patient-list.service';
//import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {
  patients: any;
  isAuthenticated: boolean;
  currentAuthenticatedUsername: string;
  storePatientsToGraph: any;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public patientListSvc: PatientListService,
    public events: Events) {
  }

  ngOnInit() {
  }

  getPatients() {
    this.patientListSvc.getPatients().then((data) => {
      this.patients = data;
      this.storePatientsToGraph = data;

      var july = 0;
      var august = 0;
      var september = 0;
      var october = 0;
      for (var index in data) {
        // if (data[index].Surgeries != null) {
        //   var surgery = data[index].Surgeries[0];
        //   var completedDate = surgery.CompletedDate;
        //   if (completedDate != undefined) {
        //     var currentMonth = new Date(completedDate).getMonth();
        //     if (currentMonth == 6)
        //       july++;
        //     if (currentMonth == 7)
        //       august++;
        //     if (currentMonth == 8)
        //       september++;
        //     if (currentMonth == 9)
        //       october++;
        //   }
        // }
      }
      this.storePatientsToGraph = [july, august, september, october];
      // this.lineChart = new Chart(this.lineCanvas.nativeElement, { 
      //   type: 'line',
      //   data: {
      //       labels: ["July", "August", "September", "October"],
      //       datasets: [
      //           {
      //               label: "Completed Surgeries",
      //               fill: false,
      //               lineTension: 0.1,
      //               backgroundColor: "rgba(75,192,192,0.4)",
      //               borderColor: "rgba(75,192,192,1)",
      //               borderCapStyle: 'butt',
      //               borderDash: [],
      //               borderDashOffset: 0.0,
      //               borderJoinStyle: 'miter',
      //               pointBorderColor: "rgba(75,192,192,1)",
      //               pointBackgroundColor: "#fff",
      //               pointBorderWidth: 1,
      //               pointHoverRadius: 5,
      //               pointHoverBackgroundColor: "rgba(75,192,192,1)",
      //               pointHoverBorderColor: "rgba(220,220,220,1)",
      //               pointHoverBorderWidth: 2,
      //               pointRadius: 1,
      //               pointHitRadius: 10,
      //               data: this.storePatientsToGraph,
      //               //data: [65, 59, 80, 81, 56, 55, 40],
      //               spanGaps: false,
      //           }
      //       ]
      //   }
      // });
    })
    .catch((error) => {
      console.log('get patients error', error);
      this.patients = [];
    });
     
    return this.storePatientsToGraph;
  }

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#a2eaf2',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
}

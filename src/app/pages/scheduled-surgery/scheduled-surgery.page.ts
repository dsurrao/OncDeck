import { Component, OnInit } from '@angular/core';
import { AlertController, Events, NavController } from '@ionic/angular';
import { SurgeryService } from '../../services/surgery.service';
import { Patient } from '../../models/patient';
import { Surgery } from '../../models/surgery';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Observable, of, from, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-scheduled-surgery',
  templateUrl: './scheduled-surgery.page.html',
  styleUrls: ['./scheduled-surgery.page.scss'],
})
export class ScheduledSurgeryPage implements OnInit {
  patient$: Observable<Patient>;
  surgery$: Observable<Surgery>; // pass in existing surgery details, if this is for an update
  scheduledDate: string;
  completedDate: string;
  subscriptions: Subscription[] = [];

  constructor(public navCtrl: NavController, 
    public surgerySvc: SurgeryService,
    public patientSvc: PatientService,
    public events: Events,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    let surgeryId = this.route.snapshot.paramMap.get('surgeryId');

    this.patient$ = from(this.patientSvc.getPatient(patientId)).pipe(take(1));
    if (surgeryId != null) {
      this.surgery$ = this.patient$.pipe(map(patient => {
        for (let s of patient.surgeries) {
          if (s.id === surgeryId) {
            return s;
          }
        }
      }));
    }
    else {
      this.surgery$ = of(new Surgery());
    }
  }

  save(surgery: Surgery) {
    let subscription = this.patient$.subscribe((patient) => {
      this.surgerySvc.save(patient, surgery).then((resp) => {
        this.events.publish('patientSaved');
        this.navCtrl.navigateBack('patient/' + patient._id);
      }).catch((error) => {
        let title: string = 'Error saving patient';
        let subTitle: string = '';
        if (error.status == '409') {
          subTitle = "This patient's data was updated by somewhere else; please refresh data via the home page";
        }
        else {
          subTitle = error;
        }
        this.showAlert(title, subTitle);
      });
    })
    this.subscriptions.push(subscription);
  }

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      header: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    for (let s of this.subscriptions) {
      s.unsubscribe();
    }
  }
}


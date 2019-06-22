// TODO: remove smart/dumb component pattern
import { Component, OnInit } from '@angular/core';
import { AlertController, Events, NavController } from '@ionic/angular';
import { Patient } from '../../models/patient';
import { PouchdbService } from '../../services/pouchdb.service';
import { SurgicalPathology } from '../../models/surgical-pathology';
import { DateUtils } from '../../common/dateutils';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { SurgeryService } from 'src/app/services/surgery.service';
import { Observable, from, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EstrogenReceptor } from 'src/app/models/er-receptor';
import { ProgesteroneReceptor } from 'src/app/models/pr-receptor';
import { Her2Receptor } from 'src/app/models/her2-receptor';
import { Features } from 'src/app/models/features';

@Component({
  selector: 'app-surgical-pathology',
  templateUrl: './surgical-pathology.page.html',
  styleUrls: ['./surgical-pathology.page.scss'],
})
export class SurgicalPathologyPage implements OnInit {
  patient$: Observable<Patient>;
  pathology$: Observable<SurgicalPathology>;
  subcriptions: Subscription[] = [];

  constructor(public navCtrl: NavController, 
    public db: PouchdbService,
    public patientSvc: PatientService,
    public surgerySvc: SurgeryService,
    public events: Events,
    public dateUtils: DateUtils,
    public alertController: AlertController,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    let pathologyId = this.route.snapshot.paramMap.get('pathologyId');

    this.patient$ = from(this.patientSvc.getPatient(patientId)).pipe(take(1));
    if (pathologyId != null) {
      this.pathology$ = this.patient$.pipe(
        map(patient => {
          for (let p of patient.surgicalPathologies) {
            if (p.id === pathologyId) {
              return p;
            }
          }
        })
      );
    }
    else {
      let pathology: SurgicalPathology = new SurgicalPathology();
      pathology.er = new EstrogenReceptor();
      pathology.pr = new ProgesteroneReceptor();
      pathology.her2 = new Her2Receptor();
      pathology.features = new Features();
      this.pathology$ = of(pathology);
    }
  }
  
  save(pathology: SurgicalPathology) {
    let subscription = this.patient$.subscribe(patient => {
      this.surgerySvc.saveSurgicalPathology(patient, pathology).then((resp) => {
        this.events.publish('patientSaved');
        this.navCtrl.navigateBack('/patient/' + patient._id);
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
    });
    
    this.subcriptions.push(subscription);
  }

  async showAlert(titleTxt: string, subTitleTxt: string) {
    const alert = await this.alertController.create({
      header: titleTxt,
      subHeader: subTitleTxt,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnDestroy() {
    for (let s of this.subcriptions) {
      s.unsubscribe();
    }
  }

}

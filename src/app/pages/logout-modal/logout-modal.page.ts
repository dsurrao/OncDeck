import { Component, OnInit } from '@angular/core';
import { Events, NavController, NavParams, ModalController } from '@ionic/angular';
import { PouchdbService } from '../../services/pouchdb.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.page.html',
  styleUrls: ['./logout-modal.page.scss'],
})
export class LogoutModalPage implements OnInit {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public events: Events,
    public dbService: PouchdbService) {}

  ngOnInit() {
  }

  signout () {
    this.dbService.logout().then((response) => {
      this.dismiss();
    });
  }

  dismiss() { 
    this.events.publish('userLoggedOut');
    this.modalCtrl.dismiss();
  }

}

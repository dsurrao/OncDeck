import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';

@Component({
  selector: 'modal-logout',
  templateUrl: 'logout.html'
})
export class LogoutModal {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public events: Events,
    public dbProvider: PouchdbProvider) {}
  ionViewDidLoad() {
  }

  signout () {
    this.dbProvider.logout().then((response) => {
      this.dismiss();
    });
  }

  dismiss() { 
    this.events.publish('userLoggedOut');
    this.viewCtrl.dismiss();
  }
}

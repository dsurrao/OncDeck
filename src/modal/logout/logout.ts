import { Component } from '@angular/core';
import { Events, NavController, NavParams, ViewController } from 'ionic-angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'modal-logout',
  templateUrl: 'logout.html'
})
export class LogoutModal {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public events: Events) {}
  ionViewDidLoad() {
  }

  signout () {
    Auth.signOut().then((result) => {
      this.dismiss();
    });
  }

  dismiss() { 
    this.events.publish('userLoggedOut');
    this.viewCtrl.dismiss();
  }
}

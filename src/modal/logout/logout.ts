import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'modal-logout',
  templateUrl: 'logout.html'
})
export class LogoutModal {
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}
  ionViewDidLoad() {
  }

  signout () {
    Auth.signOut().then((result) => {
      this.dismiss();
    });
  }

  dismiss() { 
    this.viewCtrl.dismiss();
  }
}

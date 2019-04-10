import { Component } from '@angular/core';
import { Events, NavController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { Auth } from 'aws-amplify';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';

@Component({
  selector: 'modal-login',
  templateUrl: 'login.html'
})
export class LoginModal {
  
  page: string = 'login'
  credentials: Credentials = {}
  message: string
  error: string
  userId: string;


  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public events: Events,
    public dbProvider: PouchdbProvider) {}

  ionViewDidLoad() { }

  signin () {
    let loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });

    loading.present().then(() => {
      this.dbProvider.login(this.credentials.username, this.credentials.password).then((response) => {
        //console.log(response);
        this.dismiss()
        loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
      })
    });
  }

  register () {
    let c = this.credentials;
    Auth.signUp(this.credentials.username,
      this.credentials.password,
      this.credentials.email).then((user) => {
        console.log('register: success', user)
        this.page = 'confirm'
      }).catch((err) => {
        console.log('error registering', err)
        this.setError(err.message)
      });
  }

  confirm () {
    Auth.confirmSignUp(this.credentials.username, this.credentials.confcode).then((user) => {
      this.page = 'login'
      this.setMessage('You have been confirmed. Please sign in.')
    }).catch((err) => {
      console.log('error confirming', err)
      this.setError(err.message)
    })
  }

  private setMessage(msg) {
     this.message = msg
     this.error = null
  }

  private setError(msg) {
     this.error = msg
     this.message = null
  }

  dismiss () { 
    this.events.publish('userLoggedIn');
    this.viewCtrl.dismiss();
  }

  reset () { this.error = null; this.message = null; }

  showConfirmation () { this.page = 'confirm' }
}

interface Credentials {
  username?: string
  email?: string
  password?: string
  confcode?: string
}

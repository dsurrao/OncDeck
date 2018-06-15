import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Auth } from 'aws-amplify';

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
    public navParams: NavParams, 
    public viewCtrl: ViewController) {}

  ionViewDidLoad() { }

  signin () {
    Auth.signIn(this.credentials.username, this.credentials.password)
      .then(user => {
        Auth.currentCredentials().then(credentials => {
            this.userId = credentials.identityId;
          }
        );
        this.dismiss()
      })
      .catch(err => console.log('error signing in', err));
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

  dismiss () { this.viewCtrl.dismiss() }

  reset () { this.error = null; this.message = null; }

  showConfirmation () { this.page = 'confirm' }
}

interface Credentials {
  username?: string
  email?: string
  password?: string
  confcode?: string
}

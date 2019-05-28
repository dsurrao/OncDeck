import { Component, OnInit } from '@angular/core';
import { Events, 
  NavController, 
  LoadingController, 
  NavParams,
  ModalController
} from '@ionic/angular';
import { PouchdbService } from '../../services/pouchdb.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  page: string = 'login'
  credentials: Credentials = {}
  message: string
  error: string
  userId: string;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public events: Events,
    public dbService: PouchdbService) {}

  ngOnInit() {
  }

  async signin () {
    //this.presentLoading();

    let loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });

    loading.present().then(() => {
      this.dbService.login(this.credentials.username, this.credentials.password).then((response) => {
        //console.log(response);
        loading.dismiss();
        this.dismiss();
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
        this.dismiss();
      })
    });
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
    this.modalCtrl.dismiss();
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
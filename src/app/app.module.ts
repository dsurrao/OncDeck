import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device/ngx';
import { DateUtils } from './common/dateutils';
import { LoginModalPage } from '../app/pages/login-modal/login-modal.page';
import { LogoutModalPage } from '../app/pages/logout-modal/logout-modal.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    //LoginModalPage,
    //LogoutModalPage
  ],
  entryComponents: [
    //LoginModalPage,
    //LogoutModalPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Device,
    DateUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

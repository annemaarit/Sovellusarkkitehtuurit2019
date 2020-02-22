import { SQLite } from '@ionic-native/sqlite/ngx';        
import { Camera } from '@ionic-native/camera/ngx';

import { LajitPageModule } from './lajit/lajit.module';
import { TekstitPageModule } from './tekstit/tekstit.module';
import { YhteystiedotPageModule } from './yhteystiedot/yhteystiedot.module';
import { EsikatseluPageModule } from './esikatselu/esikatselu.module';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, 
            LajitPageModule, TekstitPageModule, YhteystiedotPageModule, EsikatseluPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

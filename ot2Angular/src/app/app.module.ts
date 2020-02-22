/*
    file: app.component.ts
    desc: OT2, vippikirjanpito
            - juurikomponentti: reittipolut
    date: 30.1.2019
    auth: Maarit Parkkonen
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { VelatComponent } from './velat/velat.component';
import { SaatavatComponent } from './saatavat/saatavat.component';
import { ValintaComponent } from './valinta/valinta.component';

const reitit:Routes=[                 //reittipolkujen taulukko
  {
    'path':"",                        //juuripolku
    'component':ValintaComponent      //päänäkymä
  },
  {
    'path':"saatavat",                
    'component':SaatavatComponent
  },
  {
    'path':"velat",
    'component':VelatComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    VelatComponent,
    SaatavatComponent,
    ValintaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(reitit)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

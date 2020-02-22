// @Maarit Parkkonen, Ot8, Lähin Otto-automaattisovellus, toiminnot
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { Otto } from '../otto';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import otot from '../../assets/otot.json';         
import { Device } from '@ionic-native/device/ngx';           
//lisätty myös tsconfig.json options: "resolveJsonModule": true,"esModuleInterop": true 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lahinOtto: Otto = null;                           //löydetty lähin automaatti
  automaatit: Otto[]=otot;                          //kaikki automaatit
  virhe: any=null;
  etaisyys: string="";                              //laitteen ja lähimmän automaatin välillä
  os: string="";                                    //käyttöjärjestelmä

  constructor(private sijainti: Geolocation,        //paikannusolio
              private platform: Platform,
              private laite: Device)
  {
    this.os=laite.platform;                         //laitteen käyttis
  }              

  //pyytää laitteen sijaintitiedot ja laskee niihin verraten lähimmän Otto-automaatin sijainnin
  etsiLahin = ():void =>{
    let lahin: Otto = this.automaatit[0];           //hakutilanteen mukainen lähin automaatti
    let lyhin: number;                              //hakutilanteen mukainen lyhin välimatka
    let valimatka: number;                          //haun apumuuttuja
    let lat: number;                                //latitude
    let long: number;                               //longitude

    this.platform.ready().then(async () =>{

      this.sijainti.getCurrentPosition().then((resp) => {               //paikannusoliolta pyydetään koordinaatit
        
        lat=resp.coords.latitude;
        long=resp.coords.longitude;

        lyhin=this.laskeValimatka(lat,long,otot[0].koordinaattiLat,otot[0].koordinaattiLon);             //alustuksena eka välimatka
        this.automaatit.forEach(automaatti => {                                                          //kaikkien automaattien läpikäynti
          valimatka=this.laskeValimatka(lat,long,automaatti.koordinaattiLat,automaatti.koordinaattiLon); //välimatka automaattiin
          if(valimatka<lyhin){                                                                           //jos lyhyin tähän mennessä
            lahin=automaatti;
            lyhin=valimatka;
          }
        });
        this.etaisyys=lyhin.toFixed(2);            //tallennus bindattuun muuttujaan
        this.lahinOtto=lahin;                      
      }).catch((err) => {                          //jos laitteen paikannus epäonnistui
        this.virhe=err;
      }); //sijainti

    }); //platform

  }

  //laskee kahden pisteen välisen etäisyyden kilometreina
  laskeValimatka = (x1:number,y1:number,x2:number,y2:number):number =>{
    //https://en.wikipedia.org/wiki/Decimal_degrees => E/W at 45N/S vakio 78,71km eli lähempänä meidän leveyspiiriä
    //https://sciencing.com/convert-distances-degrees-meters-7858322.html 111,139km mutta se on yleisvakio
    let kmVakio: number=78.71;
    let valimatka: number;
    valimatka=(Math.sqrt(((x2-x1)**2)+((y2-y1)**2)))*kmVakio;
    return valimatka;
  }

}

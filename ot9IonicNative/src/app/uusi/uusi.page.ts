//uuden paikan kyselymodaalin toiminnot
import { ModalController, Platform } from '@ionic/angular';
import { Sijainti } from './../Sijainti';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-uusi',
  templateUrl: './uusi.page.html',
  styleUrls: ['./uusi.page.scss'],
})
export class UusiPage implements OnInit {
  paikka : Sijainti = {           //uuden paikan tiedoille
    id: 0,
    lat: 11,
    lon: 12,
    pvm: null,
    otsikko: "",
    teksti: "",
    kuvat: []
  };
  virhe: string ="";

  constructor(private modalCtrl:ModalController,
              private platform:Platform,
              private sijainti:Geolocation) { }

  ngOnInit() {
  }

  //modaali peruttu
  peruuta = (): void =>{
    this.modalCtrl.dismiss();                    //suljetaan modaali
  }

  //lähettää modaalissa annetut tiedot avausta pyytäneelle sivulle
  laheta = (): void =>{
    this.platform.ready().then(async () => {       //kun laite on valmis
      this.sijainti.getCurrentPosition().then((resp) => {   //pyydetään paikkatiedot paikkasovellukselta
        this.paikka.lat=resp.coords.latitude;
        this.paikka.lon=resp.coords.longitude;
        this.paikka.pvm= new Date();               //tallennushetki muistiin
      }).catch((err) => {                          //jos laitteen paikannus epäonnistui
        this.virhe=err;
      }); //sijainti
    });

    this.modalCtrl.dismiss(this.paikka);          //suljetaan modaali ja välitetään tiedot
  }

}

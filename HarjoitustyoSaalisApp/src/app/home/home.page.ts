
//Maarit Parkkonen 2019, SaalisApp -sovelluksen etusivun toiminnot
import { TunnuspalvelutService } from './../tunnuspalvelut.service';

import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { DbpalvelutService } from '../dbpalvelut.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor (private infoCtrl: AlertController,
               private dbpalvelut: DbpalvelutService,
               private router: Router,
               private tunnuspalvelut: TunnuspalvelutService){}

  //tarkistaa käyttäjätunnuksen
  // - parametri ilmoittaa onko kyseessä ohjaus uuden ilmoituksen tekoon vai omiin ilmoituksiin
  onkoKayttajaTiedossa = async (uusiIlmoitus:boolean) : Promise<any> => {
    if (this.dbpalvelut.kayttaja==null){                //käyttäjä ei tiedossa
      if (uusiIlmoitus){
        this.tunnuspalvelut.kysyIlmoittaja();           //uuden ilmoituksen kohdalla kysytään onko käyttäjällä tunnusta
      } else {
        this.tunnuspalvelut.kysyTunnus(true);           //omien ilmoitusten kohdalla kysytään suoraan tunnusta
      }
    } else {                                            //käyttäjä on tiedossa
      if (uusiIlmoitus){                                //kyseessä uuden ilmoituksen teko
        this.router.navigate(["/uusi"]);                
      } else {                                          //kyseessä omat ilmoitukset
        await this.dbpalvelut.haeOmatIlmoitukset(this.dbpalvelut.kayttaja.id);  //haetaan käyttäjän ilmoitukset
        if (this.dbpalvelut.kpl!=0){                   
          this.router.navigate(["/omat"]);              
        }
        else {                                          
          this.avaaInfo("Ei ilmoituksia","Sinulla ei ole julkaistuna yhtään ilmoitusta.");
        }
      }
    }
  }

  //infodialogin avaus
  avaaInfo = async (otsikko: string, viesti: string) : Promise<any> => {
    const ikkuna = await this.infoCtrl.create({
                    header: otsikko,
                    message: viesti,
                    buttons: ["Ok"]
    });
    await ikkuna.present();
  }

}

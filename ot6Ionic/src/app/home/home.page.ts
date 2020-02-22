//@maarit parkkonen, 2019
import { SaatiedotService } from './../saatiedot.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private saatiedot: SaatiedotService, private alertCtrl: AlertController, private router: Router){}

  //dialogi-ikkuna, jossa voi antaa paikkakunnan nimen
  vaihdaKaupunki = async (): Promise<any> =>{
      const ikkuna = await this.alertCtrl.create({             //ikkunan luonti
          header: "Uusi paikkakunta",
          inputs: [                                             
            {
              name: "paikka",                                  //tekstikenttä
              type: "text",
              placeholder: "Kirjoita paikkakunnan nimi.."
            }
          ],
          buttons: [
            {
              text: "Hae tiedot",                              //tiedot ok
              cssClass: "primary",
              handler:(data:any)=>{
                this.saatiedot.haeTiedot(this.muotoileTeksti(data.paikka)); //uusien säätietojen haku, ensin syötetyn tiedon muotoilu
                this.router.navigate(["/home"]);                            //näkymän uudistus
              }

            },
            {
              text: "Peruuta",                                  //toiminnan peruutus, ikkunan sulku
              role: "cancel",
              cssClass: "secondary"

            }
          ]
      });
      await ikkuna.present();                                   //ikkuna näkyviin
  }

  //muokkaa käyttäjän antamaa tekstisyötettä
  muotoileTeksti = (teksti :string): string =>{
    teksti = teksti.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/å/g,"a"); //koko teksti pieniksi kirjaimiksi, skandinaavisten merkkien korvaus
    return teksti;
  }
}

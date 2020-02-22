//Maarit Parkkonen, 2019, SaalisApp, lajimodaalin käyttöpalvelut
import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { marjat } from './marjat';
import { sienet } from './sienet';
import { kalat } from './kalat';
import { riista } from './riista';
import { LajitPage } from './lajit/lajit.page';

@Injectable({
  providedIn: 'root'
})
export class LajipalvelutService {
  marjat: string[]=marjat;
  sienet: string[]=sienet;
  kalat: string[]=kalat;
  riista: string[]=riista;
  lajiNimi: string ="";
  osasto: string="";
  kaikkiValittu: string="";

  constructor(private modalCtrl: ModalController) { }

    //lajimodaalin avaus
    // -parametrina mikä lajiryhmä kyseessä ja onko hakunäkymästä tullut pyyntö
    lajiLuettelo = async (osastoNro: number, haku: boolean): Promise<any> => {

      let oletusAsetukset ={
        vari: "",
        lajilista: [],
        osasto: "",
        otsikko: "",
        laji: ""
      }
      
      //lajiryhmän eli osaston valinta
      switch (osastoNro) {
        case 1:
          oletusAsetukset.vari="tertiary";
          oletusAsetukset.lajilista=this.marjat;
          oletusAsetukset.osasto = "marja";
          oletusAsetukset.otsikko = "Marjat";
          break;
        case 2:
          oletusAsetukset.vari="warning";
          oletusAsetukset.lajilista=this.sienet;
          oletusAsetukset.osasto = "sieni";
          oletusAsetukset.otsikko = "Sienet";
          break;
        case 3:
          oletusAsetukset.vari="danger";
          oletusAsetukset.lajilista=this.kalat;
          oletusAsetukset.osasto = "kala";
          oletusAsetukset.otsikko = "Kalat";
          break;
        case 4:
          oletusAsetukset.vari="secondary";
          oletusAsetukset.lajilista=this.riista;
          oletusAsetukset.osasto = "riista";
          oletusAsetukset.otsikko = "Riista";
          break;
        default:
          break;
      }
      
      //jos avauspyyntö hakunäkymästä, lisätään vaihtoehto kaikki
      if (haku){
        oletusAsetukset.lajilista.unshift("kaikki");
      }
  
      const modaali = await this.modalCtrl.create({
        component: LajitPage,
        componentProps: {asetukset: oletusAsetukset}
      });
      
      await modaali.present();
  
      modaali.onDidDismiss().then((asetukset)=>{
        if (asetukset){                               //laji on valittu
          this.lajiNimi = asetukset.data.laji;
          this.osasto = asetukset.data.osasto;
          if (this.lajiNimi=="kaikki"){               //kaikki valittu
            this.kaikkiValittu=this.osasto+"lajit";
          } else {                                    //yksittäinen laji valittu              
            this.kaikkiValittu="";
          }
        } else {                                      //ei valintaa, peruttu
            //this.tyhjennaValinnat();
        }
        oletusAsetukset.lajilista=[];
      });
    }

    tyhjennaValinnat = () : void =>{
      this.lajiNimi = "";
      this.osasto = "";
      this.kaikkiValittu="";
    }


}

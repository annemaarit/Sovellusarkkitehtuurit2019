//ensimmäisen näytön metodit ja palveluolio

import { MokkivarausService } from './../mokkivaraus.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  minVuosi: string;                               //päivyrin mimini
  maxVuosi: string;                               //päivyrin maksimi

  constructor(private mokkivaraus: MokkivarausService){
    this.minVuosi=this.valitseVuosi(true);        //päivyrin vuosiarvot HUOM! muoto vvvv-kk-pp ei toiminut hyvin, koska
    this.maxVuosi=this.valitseVuosi(false);       //ei anna valita tulevilla vuosilla kaikkia päiviä tai kuukausia
  }

  ngOnInit(){}

  //päivittää varauksen loppusumman valintoja vastaavaksi
  paivitaSumma = () : void => {
    let siivousMaksu: number = 0;
    if (this.mokkivaraus.varaus.siivous){       //jos loppusiivous on valittu
      siivousMaksu=100;                         //siivouksen hinta
    }
    if (this.mokkivaraus.varaus.mokki.id!=0){   //jos mökki on valittu
      this.mokkivaraus.varaus.summa=(this.mokkivaraus.varaus.mokki.hinta*this.mokkivaraus.varaus.paivatKpl)+siivousMaksu; //lasketaan kaikki
    } else {                                    //jos mökkiä ei ole valittu
      this.mokkivaraus.varaus.summa=siivousMaksu; 
    }
  };

  //palauttaa joko kuluvan vuosiluvun tai kaksi vuotta eteenpäin olevan  
  valitseVuosi= (nyt:boolean) : string =>{
    let tanaan: any = new Date();         //nykyinen päiväys
    let vvvv: any;                        //vuosi
    if (nyt) {
        vvvv = tanaan.getFullYear();      //menossa oleva vuosi
    }else{
        vvvv = tanaan.getFullYear()+2;    //kaksi vuotta enemmän
    }
    return vvvv;
  }

}

/*
    file: vippilistat.service.ts
    desc: OT2, vippikirjanpito
            - vippilistat palvelun attribuutit ja metodit
    date: 30.1.2019
    auth: Maarit Parkkonen
*/
import { Injectable } from '@angular/core';
import { Vippi } from './vippi';                    //tietotyyppi mukaan

@Injectable({
  providedIn: 'root'
})
export class VippilistatService {
  velkaSumma : number = 0;
  saatavatSumma : number = 0;

  //atribuutit------------------------------------------------------------------------

  saatavat : Vippi[]=[                              //taulukko saatavista
    {
      id : 1,
      nimi : "Aku Ankka",
      summa: 156
    },
    {
      id : 2,
      nimi : "Hessu Hopo",
      summa: 21
    }
  ];

  velat : Vippi[]=[                                 //taulukko veloista
    {
      id : 1,
      nimi : "Iines Ankka",
      summa: 120
    },
    {
      id : 2,
      nimi : "Hannu Hanhi",
      summa: 350
    }
  ];

  //metodit-----------------------------------------------------------------------

  //palauttaa velkojen tai saatavien kokonaismäärän 
  getSumma = (valittu) : number => {
    let taulu : Vippi[];                            //kohdetaulun osoitus apumuuttujaan
    if (valittu=="velka"){
      taulu = this.velat;
    }else{
      taulu = this.saatavat;
    }

    let summa : number = 0;                         //summien läpikäynti ja yhteenlaskenta
    taulu.forEach(index => {      
      summa=summa+Number(index.summa);   
    });
    return summa;
  }

  //lisää uuden vipin (velan tai saatavan)
  lisaaUusi = (valittu, nimi, summa) : void => {
    let taulu : Vippi[];                             //kohdetaulun osoitus apumuuttujaan
    if (valittu=="velka"){
      taulu = this.velat;
    }else{
      taulu = this.saatavat;
    }
   
    let apuId=1;                                     //jos taulukko on tyhjä id=1
    if (taulu.length>0){                             //jos taulukko ei ole tyhjä
      apuId=taulu[taulu.length-1].id+1;              //lasketaan seuraava id
    }
    let uusiVippi : Vippi = {                        //lisättävän objektin muodostus
      "id" : apuId,
      "nimi" : nimi,
      "summa" : summa
    }
    taulu.push(uusiVippi);                           //lisäys loppuun
  }

  //poistaa vipin (velan tai saatavan)
  poistaVippi = (valittu, id) : void => {
    let apuId = 0;

    let taulu : Vippi[];                             //kohdetaulun osoitus apumuuttujaan
    if (valittu=="velka"){
      taulu = this.velat;
    }else{
      taulu = this.saatavat;
    }

    let pituus = taulu.length;
    while ((taulu[apuId].id!=id)&&(apuId<pituus)){    //etsitään objekti, jolla annettu id
      apuId++;
    };
    console.log(apuId);
    if (apuId<pituus){                                //jos objekti löytyi
      taulu.splice(apuId,1);                          //poistetaan se
    } else {
      console.log("Virhe: poiston id ei löytynyt");
    }    
  }

  constructor() { }
}

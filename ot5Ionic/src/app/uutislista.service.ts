//@Maarit Parkkonen, 2019
//uutisiin liittyvät attribuutit ja metodit

import { Uutinen } from './uutinen';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UutislistaService {

  uutiset: Uutinen[] = null;                            //uutispalvelusta haettu uutislista
  uusinAikaleima: number;                               //ensimmäisen uutisen aikaleima

  //millisekunttivakioita uutisen iän laskentaan
  sekuntti: number = 1000; 
  minuutti: number  = 60*this.sekuntti; 
  tunti: number  = 60*this.minuutti;
  tuntiraja: number = 12 * this.tunti; 

  paivitys: boolean = false;                             //päivitys vai uusi haku
  kategoriat: string[] = ["yleiset", "urheilu", "viihde", "terveys", "matkailu", "digi"];
  kategoria: string="";                                  //valittuna oleva kategoria
  url: string="https://so3server.herokuapp.com/uutiset"; //uutispalvelu

  constructor(private http: HttpClient) {                //http -olion luonti
    this.haeUutiset();                          
   }

   //uutislistauksen haku uutispalvelusta
   haeUutiset = () : void => {
    let apuUrl: string; 
    if (this.kategoria==""){                            //jos kategoriaa ei ole valittuna
      apuUrl=this.url;
    } else {
      apuUrl=this.url+"/"+this.kategoria;               //jos kategoria on valittu
    }
    this.http.get(apuUrl).subscribe((data:Uutinen[])=>{ //uutislistan haku 
    if (this.paivitys){                                 //jos listaa päivitetään
      this.uusinAikaleima=this.uutiset[0].aikaleima;    //vanhan listan ekan uutisen aikaleima muistiin
    }
    this.uutiset=data;                                  //haettu tieto uutislistamuuttujaan
    this.laskeJulkaisuIka();                            //lasketaan jokaiselle uutiselle ikä
    this.merkitseUudet();                               //merkitään uudet uutiset
    });
   }

   //merkitsee jokaisen uutisen tietueeseen onko uusi(true) vai vanha(false) uutinen
   merkitseUudet = (): void =>{
      if (this.paivitys){                               //kyseessä listan päivitys
        let loytyi: boolean = false;                    //onko vanhan listan eka uutinen löytynyt uudesta listasta
        //testaus:
        //this.uutiset[2].aikaleima=this.uutiset[0].aikaleima;
        //this.uutiset[0].aikaleima=1111223;
        //this.uutiset[1].aikaleima=1111223;
        this.uutiset.forEach(uutinen => {               //käy kokonaan uuden uutislistan läpi
          if (uutinen.aikaleima!=this.uusinAikaleima&&!loytyi) { //jos aikaleimat ovat erilaiset ja vanhan listan ekaa ei ole löytynyt
            uutinen.uusi=true;                          //kyseessä uusi uutinen
          } else {                                      //muutoin
            uutinen.uusi=false;                         //kyseessä vanha uutinen
            loytyi=true;                                //vanhan listan eka löytynyt
          }
        });
      } else {                                          //kyseessä uuden listan haku
        this.uutiset.forEach(uutinen => {               //kaikki uutiset vanhoiksi
          uutinen.uusi=false;
        });
        this.paivitys=true;                             
      }
   }

   //miten pitkä aika sitten uutinen on julkaistu nykyhetkestä
   laskeJulkaisuIka = (): void =>{
      let nykyaika: number = new Date().getTime();    
      let ikaTeksti: string = "";                         //teksti, joka tallennetaan uutisobjektiin

      this.uutiset.forEach(uutinen => {                   //kaikkien uutisten läpikäynti
        ikaTeksti="";
        let viive: number  = nykyaika-uutinen.aikaleima;  //uutisen ikä Unix ajassa (millisekuntteina)

        if (viive>=this.tuntiraja){                       //jos ikä suurempi kuin tuntiraja
          ikaTeksti="yli 12 tuntia sitten";
        } else {                                          //lasketaan iän tunnit, minuutit ja sekunnit, merkitään tekstiin
          let tunnit: number = Math.floor(viive / this.tunti);
          if (tunnit>0){                                  //jos iässä tunteja
            ikaTeksti=tunnit+"h ";
          }
          viive=viive-(tunnit*this.tunti);
          if (viive>0){                                   
            let minuutit: number = Math.floor(viive / this.minuutti);
            if (minuutit>0){                              //jos iässä minuutteja
              ikaTeksti=ikaTeksti+minuutit+"min ";
            }
            viive=viive-(minuutit*this.minuutti);
            if (viive>0){ 
              let sekunnit: number = Math.floor(viive / this.sekuntti);
              if (sekunnit>0){                            //jos iässä sekuntteja
                ikaTeksti=ikaTeksti+sekunnit+"s ";
              }
            }
          }
          ikaTeksti=ikaTeksti+"sitten";
        }

        uutinen.ika=ikaTeksti;                            //ikäteksti uutisobjektiin
      });
  }
}

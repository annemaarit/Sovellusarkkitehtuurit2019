/*
    file: app.component.ts
    desc: OT1, painoindeksilaskuri
            - muuttujat ja metodit
    date: 25.1.2019
    auth: Maarit Parkkonen

*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  paino : number;
  pituus : number;
  indeksi : number;
  vari : string = "";               //alert -komponentin taustaväri
  virhe : string = "";              //virheen teksti
  dg : string = "";                 //painoindeksiä vastaava teksti
  fonttivari : string = "black";
  
  //indeksin laskenta ja tuloksen mukaiset muutokset
  //    - tarkistaa ensin onko tiedot annettu
  laskeIndeksi = () : void =>{
    if (!this.pituus){              //jos pituus puuttuu
      this.vari = "Black";
      this.fonttivari="white";
      this.virhe="PITUUS PUUTTUU";
      this.dg="";
    }else if (!this.paino){         //jos paino puuttuu
      this.vari = "Black";
      this.fonttivari="white";
      this.virhe="PAINO PUUTTUU";
      this.dg="";
    }else{                          //tiedot annettu
      this.indeksi = (this.paino/(((this.pituus)/100)*(this.pituus)/100));  //laskenta
      //tausta- ja fonttiväri sekä kuvausteksti
      this.virhe="";
      if (this.indeksi<15){
        this.vari="MidnightBlue";
        this.dg=" = sairaalloinen alipaino";
        this.fonttivari="white";
      } else if ((this.indeksi>=15)&&(this.indeksi<17)){
        this.vari="MediumSlateBlue";
        this.dg=" = merkittävä alipaino";
        this.fonttivari="white";
      } else if ((this.indeksi>=17)&&(this.indeksi<18.5)){
        this.vari="LightSkyBlue";
        this.dg=" = normaalia alhaisempi paino";
        this.fonttivari="black";
      } else if ((this.indeksi>=18.5)&&(this.indeksi<25)){
        this.vari="MintCream";
        this.dg=" = normaali paino";
        this.fonttivari="black";
      } else if ((this.indeksi>=25)&&(this.indeksi<30)){
        this.vari="MistyRose";
        this.dg=" = lievä ylipaino";
        this.fonttivari="black";
      } else if ((this.indeksi>=30)&&(this.indeksi<35)){
        this.vari="Salmon";
        this.dg=" = merkittävä ylipaino";
        this.fonttivari="black";
      } else if ((this.indeksi>=35)&&(this.indeksi<=40)){
        this.vari="FireBrick";
        this.dg=" = vaikea ylipaino";
        this.fonttivari="white";
      } else {
        this.vari="DarkRed";
        this.dg=" = sairaalloinen ylipaino";
        this.fonttivari="white";
      }

    }

  }

}

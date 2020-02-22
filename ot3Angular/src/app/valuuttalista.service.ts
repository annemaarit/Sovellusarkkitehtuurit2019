//@Maarit Parkkonen, 2019

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//omat tietotyypit
import { Valuutta } from './Valuutta';
import { ValuuttaFI } from './ValuuttaFI';

@Injectable({
  providedIn: 'root'
})
export class ValuuttalistaService {
  //data: any = {"CAD": 1.565,"CHF": 1.1798,"GBP": 0.87295,"SEK": 10.2983,"USD": 1.2234}; //testaukseen
  data: any;    //valuuttakurssit

  valuutat: Valuutta[]=[];                                          //valuuttaobjektit -taulukko
  valuutta: Valuutta={nimi:"",kurssi:1};                            //yksittäinen valuuttaobjekti
  base: Valuutta={nimi:"EUR",kurssi:1,FI:"Euroopan Unionin euro"};  //eka kantavaluutta
  valuuttaNimet: string[];                                          //valuuttojen nimitaulukko
  valuuttaKurssit: number[];                                        //valuuttojen kurssitiedot taulukko
  url: string = "https://api.exchangeratesapi.io/latest?base=";     //exchangeratesapi.io-palvelun rajapinnan alkuosa

  //käännösten objektitaulukko
  valuutatFI: ValuuttaFI[]= [
    {lyhenne:"AUD",FI:"Australian dollari"},
    {lyhenne:"BGN",FI:"Bulgarian lev"},
    {lyhenne:"BRL",FI:"Brasilian real"},
    {lyhenne:"CAD",FI:"Kanadan dollari"},
    {lyhenne:"CHF",FI:"Sveitsin frangi"},
    {lyhenne:"CNY",FI:"juan renminbi"},
    {lyhenne:"CZK",FI:"Tsekin koruna"},
    {lyhenne:"DKK",FI:"Tanskan kruunu"},
    {lyhenne:"EUR",FI:"Euroopan Unionin euro"},
    {lyhenne:"GBP",FI:"Englannin punta"},
    {lyhenne:"HKD",FI:"Honkongin dollari"},
    {lyhenne:"HRK",FI:"Kroatian kuna"},
    {lyhenne:"HUF",FI:"Unkarin forintti"},
    {lyhenne:"IDR",FI:"Indonesian rupia"},
    {lyhenne:"ILS",FI:"Israelin sekeli"},
    {lyhenne:"INR",FI:"Intian rupia"},
    {lyhenne:"ISK",FI:"Islannin kruunu"},
    {lyhenne:"JPY",FI:"Japanin jeni"},
    {lyhenne:"KRW",FI:"Etelä_Korean won"},
    {lyhenne:"MXN",FI:"Meksikon peso"},
    {lyhenne:"MYR",FI:"Malesian ringgit"},
    {lyhenne:"NOK",FI:"Norjan kruunu"},
    {lyhenne:"NZD",FI:"Uuden-Seelannin dollari"},
    {lyhenne:"PHP",FI:"Filippiinien peso"},
    {lyhenne:"PLN",FI:"Puolan zloty"},
    {lyhenne:"RON",FI:"Romanian leu"},
    {lyhenne:"RUB",FI:"Venäjän rupla"},
    {lyhenne:"SEK",FI:"Ruotsin kruunu"},
    {lyhenne:"SGD",FI:"Singaporen dollari"},
    {lyhenne:"THB",FI:"Thaimaan baht"},
    {lyhenne:"TRY",FI:"Turkin liira"},
    {lyhenne:"USD",FI:"Yhdysvaltain dollari"},
    {lyhenne:"ZAR",FI:"Etelä-Afrikan randi"}
    ];
    tulosviesti : string;
  
  constructor(private http: HttpClient) {
    this.haeTiedot(this.base);    //valuuttatietojen haku
    //this.teeValuuttaTaulukko(); //testausta varten
   }

   //valuuttatietojen haku exchangeratesapi.io-palvelun rajapinnasta
   haeTiedot = (lahde:Valuutta):void => {
    this.http.get(this.url+lahde.nimi).subscribe((datat:any)=>{
      this.data=datat.rates;        //valuuttatiedot
      this.base=lahde;              //kantavaluutta
      this.base.kurssi=1;           //kantavaluutan kurssin arvo
      //console.log(this.data);
      this.teeValuuttaTaulukko();   //valuuttatiedoista objektitaulukko
    },
    (err:any)=>{                    //jos tietojen haku epäonnistui
      console.log(err);
    });
   }

   //haetuista valuuttatiedoista muodostetaan objektitaulukko
   teeValuuttaTaulukko = ():void =>{
    //console.log(this.data);
    this.valuutat=[this.base];                        //kantavaluutta ekaksi objektiksi
    this.valuuttaNimet=Object.keys(this.data);        //valuuttojen nimet omaan taulukkoon
    this.valuuttaKurssit=Object.values(this.data);    //valuuttojen kurssit omaan taulukkoon
    for (let i=0; i<this.valuuttaNimet.length;i++){   //valuuttojen nimi- ja kurssitaulukoiden läpikäynti
      if (!(this.valuuttaNimet[i]==this.base.nimi)){  //kantavaluutta ohitetaan
        this.valuutta={                               //tiedoista valuuttaobjekti
          "nimi":this.valuuttaNimet[i],
          "kurssi":this.valuuttaKurssit[i],
          "FI":this.etsiKaannos(this.valuuttaNimet[i])  //käännöksen etsiminen
        }
        this.valuutat.push(this.valuutta);            //valuuttaobjektin lisäys objektitaulukkoon
      }
    }
    //console.log(this.valuutat);
   }

   //valuutan lyhennettä vastaavan suomennoksen etsiminen
   etsiKaannos = (nimi:string):string =>{
    let kaannos: string="";
    this.valuutatFI.forEach(valuuttaFI => {   //käy läpi käännöstaulukon (huono tehoinen..)
      if (nimi==valuuttaFI.lyhenne){          //jos käännös löytyy
        kaannos=valuuttaFI.FI;
        //break: ei toimi... miksi?
      }
    });
    if (kaannos==""){                         //jos käännöstä ei löydy
      kaannos=nimi;                           //käännökseksi lyhenne
    }
    return kaannos; 
   }
}

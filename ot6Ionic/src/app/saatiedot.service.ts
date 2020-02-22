//@maarit parkkonen, 2019
import { Saatieto } from './saatieto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaatiedotService {

  tiedot: Saatieto = {            //paikkakunnan säätiedot
      kuvaus:"",
      ikoni:"",
      lampotila: 0, 
      lampoMin: 0, 
      lampoMax: 0, 
      tuuli: 0,
      paikka:""};

  url: string ="https://so3server.herokuapp.com/saatilanne/";   //sääpalvelu
  ikoniUrl: string ="http://openweathermap.org/img/w/";         //ikonin palvelin sijainti

  virhe: string = "";              //virheilmoitus

  constructor(private http: HttpClient) {
    this.haeTiedot("mikkeli");    //ensimmäinen haku paikkakunnalla Mikkeli
  }

  //säätietojen haku sääpalvelusta
  haeTiedot = (paikka: string) : void =>{
   this.http.get(this.url+paikka).subscribe((data: any)=>{
      if (data.cod==200){        //jos haku onnistui, poimitaan datasta tarvittavat tiedot omaan sääobjektiin
        this.virhe="";
        this.tiedot.kuvaus = data.weather[0].description;
        this.tiedot.ikoni = this.ikoniUrl+data.weather[0].icon+".png";
        this.tiedot.lampotila = data.main.temp;
        this.tiedot.lampoMin = data.main.temp_min;
        this.tiedot.lampoMax = data.main.temp_max;
        this.tiedot.tuuli = data.wind.speed;
        this.tiedot.paikka = data.name;

      } else {                  //data.cod=400 eli haku epäonnistui
          this.virhe="Paikkakuntaa: "+paikka+" ei löytynyt. Kirjoita uusi paikannimi."; //virheilmoitus
      }
   },
   (err:any)=>{                 //jos hakua ei pystytty suorittamaan
      console.log(err);
      this.virhe="Palvelinvirhe. Yritä hetken kuluttua uudelleen." //virheilmoitus
   });
  }

}

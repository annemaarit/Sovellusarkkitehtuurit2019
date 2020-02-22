/*
    file: saatavat.component.ts
    desc: OT2, vippikirjanpito
            - saatavat komponentin attribuutit ja metodit
    date: 30.1.2019
    auth: Maarit Parkkonen
*/
import { Component, OnInit } from '@angular/core';
import {VippilistatService} from '../vippilistat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-saatavat',
  templateUrl: './saatavat.component.html',
  styleUrls: ['./saatavat.component.css']
})
export class SaatavatComponent implements OnInit {
  nimi : string;          //velallisen nimi
  summa : number;         //saatavan määrä
  id : number;            //tunniste
  summaus : number = 0;   //saatavien yhteissumma

  constructor(private vippilistat : VippilistatService, private router: Router) { }  //vippilista- ja reitti -olioiden luonti

  //alustukset
  ngOnInit() {
    this.summaus=this.vippilistat.getSumma("saatavat");           //yhteissumman laskenta
  }

  lisaaUusiSaatava = () : void => {
    this.vippilistat.lisaaUusi("saatavat",this.nimi,this.summa);  //lisäyksen pyyntö
    this.summaus=this.vippilistat.getSumma("saatavat");           //yhteissumman laskenta
    this.nimi="";
    this.summa=null;
    this.router.navigate(["/saatavat"]);                          //näkymän päivitys
  }

  poistaSaatava = (id) : void =>{
    this.vippilistat.poistaVippi("saatavat",id);                  //poistamisen pyyntö
    this.summaus=this.vippilistat.getSumma("saatavat");           //yhteissumman laskenta
    this.router.navigate(["/saatavat"]);                          //näkymän päivitys
  }
  
}

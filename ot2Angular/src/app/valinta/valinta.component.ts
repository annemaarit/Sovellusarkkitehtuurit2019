/*
    file: valinta.component.ts
    desc: OT2, vippikirjanpito
            - päänäkymäkomponentin attribuutit ja metodit
    date: 30.1.2019
    auth: Maarit Parkkonen
*/
import { Component, OnInit } from '@angular/core';
import {VippilistatService} from '../vippilistat.service';

@Component({
  selector: 'app-valinta',
  templateUrl: './valinta.component.html',
  styleUrls: ['./valinta.component.css']
})
export class ValintaComponent implements OnInit {
  velkaSumma : number;      //velkojen yhteissumma
  saatavatSumma : number;   //saatavien yhteissumma

  constructor(private vippilistat : VippilistatService) { }   //vippilista -olion luonti

  //alustukset
  ngOnInit() {
    this.velkaSumma=this.vippilistat.getSumma("velka");       //pyyntö velkojen yhteissumman laskennasta
    this.saatavatSumma=this.vippilistat.getSumma("saatava");  //pyyntö saatavien yhteissumman laskennasta
  }

}

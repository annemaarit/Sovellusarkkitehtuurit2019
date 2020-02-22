/*
    file: velat.component.ts
    desc: OT2, vippikirjanpito
            - velat komponentin attribuutit ja metodit
    date: 30.1.2019
    auth: Maarit Parkkonen
*/
import { Component, OnInit } from '@angular/core';
import {VippilistatService} from '../vippilistat.service';   
import {Router} from '@angular/router';                      

@Component({
  selector: 'app-velat',
  templateUrl: './velat.component.html',
  styleUrls: ['./velat.component.css']
})

export class VelatComponent implements OnInit {
  nimi : string;            //velkojan nimi
  summa : number;           //velan määrä
  id : number;              //tunniste
  summaus : number = 0;     //velkojen yhteissumma

  constructor(private vippilistat : VippilistatService, private router: Router) { } //vippilista- ja reitti -olioiden luonti

  //alustukset
  ngOnInit() {
    this.summaus=this.vippilistat.getSumma("velka");            //yhteissumman laskenta
  }

  //uuden velan lisäys velkataulukkoon
  lisaaUusiVelka = () : void => {
    this.vippilistat.lisaaUusi("velka",this.nimi,this.summa);   //lisäyksen pyyntö
    this.summaus=this.vippilistat.getSumma("velka");            //yhteissumman laskenta
    this.nimi="";
    this.summa=null;
    this.router.navigate(["/velat"]);                           //näkymän päivitys
  }

  poistaVelka = (id) : void =>{
    this.vippilistat.poistaVippi("velka",id);                  //poistamisen pyyntö
    this.summaus=this.vippilistat.getSumma("velka");           //yhteissumman laskenta
    this.router.navigate(["/velat"]);                          //näkymän päivitys
  }
  
}


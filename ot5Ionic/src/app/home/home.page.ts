//@Maarit Parkkonen, 2019
//uutislistasivun muuttujat ja toiminnot

import { Component, OnInit } from '@angular/core';
import { UutislistaService } from './../uutislista.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  kategoriaValinta: string = "";                      //kategoriavalikon valinta

  constructor(private uutislista: UutislistaService){}

  ngOnInit(){}

  //pyytää uuden uutislistan
  paivitaUutiset = (): void => {
      this.uutislista.haeUutiset();
  }

  //uutislistauksen vaihto eri kategoriaan
  vaihdaKategoria = (): void => {
    this.uutislista.kategoria=this.kategoriaValinta;  //mikä kategoria valittu
    this.uutislista.paivitys=false;                   //ei päivitys vaan uusi listaus
    this.uutislista.haeUutiset();                     //pyytää uuden uutislistan
  }

}

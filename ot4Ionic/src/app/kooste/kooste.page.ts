//yhteenveto -näytön metodit ja palvelu- sekä reititysoliot

import { Component, OnInit } from '@angular/core';
import { MokkivarausService } from './../mokkivaraus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kooste',
  templateUrl: './kooste.page.html',
  styleUrls: ['./kooste.page.scss'],
})
export class KoostePage {

  constructor(private mokkivaraus: MokkivarausService, private router: Router){}

  ngOnInit(){
  }

  //palautta selkokielisen tekstin varauksen siivousvalinnan mukaisesti
  siivotaanko = () : string =>{
    if (this.mokkivaraus.varaus.siivous){
      return "Kyllä";
    } else {
      return "Ei";
    }
  }

  //palauttaa suomalaisessa muodossa olevan päiväyksen varauksen aloituspäivästä,
  //tai tiedon ettei päiväystä ole valittu
  muunnaPaivays = () : string =>{
    let paiva: string="";
    if (this.mokkivaraus.varaus.alkuPvm!=null){       //jos päiväys valittu
      let paivays: any = new Date(this.mokkivaraus.varaus.alkuPvm);
      paiva=paivays.getDate()+"."+(paivays.getMonth()+1)+"."+paivays.getFullYear();
    } else {                                          //jos päiväystä ei ole valittu
      paiva="Ei valittu"
    }
    return paiva;
  }

  //varaus hyväksytty, varauksen tiedot tyhjennetään ja
  //siirtymä ensimmäiseen näyttöön
  vahvistaVaraus = () : void =>{
    this.mokkivaraus.tyhjennaVaraus();
    this.router.navigate(["/kiitos"]);
  };

}

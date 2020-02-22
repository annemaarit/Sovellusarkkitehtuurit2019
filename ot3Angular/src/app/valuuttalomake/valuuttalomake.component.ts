//@Maarit Parkkonen, 2019

import { Component, OnInit } from '@angular/core';
import { ValuuttalistaService } from '../valuuttalista.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valuuttalomake',
  templateUrl: './valuuttalomake.component.html',
  styleUrls: ['./valuuttalomake.component.css']
})
export class ValuuttalomakeComponent implements OnInit {
  valuuttaLomake : FormGroup;        //lomake
  summa : number=null;               //valuuttasumma
  apusumma : number;
  tulos : string;                    //muunnoksen tulos 
  lahdenimi: string;                 //valitun lähdevaluutan lyhenne
  kohdenimi: string="";              //valitun kohdevaluutan lyhenne
  virhe1: string="";                
  virhe2: string="";

  constructor(private valuuttalista: ValuuttalistaService, private formbuilder: FormBuilder, private router: Router){
    
  }

  //alustukset
  ngOnInit() {
    this.valuuttaLomake = this.formbuilder.group({    //lomakkeen syöttötietojen kontrollerit
        summaControl: [null],                         //summan määrä
        lahdeControl: [this.valuuttalista.base],      //valittu lähdevaluutta
        kohdeControl: [null]                          //valittu kohdevaluutta
    });
  }

  //laskee lomakkeen tietojen mukaisen tuloksen
  laskeMuunnos = () : void =>{
    this.virhe1="";
    this.virhe2="";
    if (this.onkoVirheita()){                                       //jos tietoja ei puutu
      this.apusumma = this.valuuttaLomake.value.summaControl;       //summan määrä
      if (this.valuuttaLomake.value.lahdeControl==null){            //jos lähdevaluutta on tyhjä eli sitä ei ole muutettu
        this.lahdenimi="EUR";
      }
      else{                                                         //lähdevaluuttaa on vaihdettu
        this.lahdenimi=this.valuuttaLomake.value.lahdeControl.nimi; //valitun lähdevaluutan lyhenne
      }
      this.kohdenimi=this.valuuttaLomake.value.kohdeControl.nimi;   //valitun kohdevaluutan lyhenne
      this.tulos=(this.apusumma*this.valuuttaLomake.value.kohdeControl.kurssi).toFixed(2); //muunnoksen laskenta ja pyöristys
      this.valuuttalista.tulosviesti="Muunnoksen tulos "+this.apusumma+" "+ this.lahdenimi +" = " + this.tulos + " " + this.kohdenimi;
      this.router.navigate(["/tulos"]);                             //tulosnäkymään
    }
  };

  //tarkistaa onko tarvittavat tiedot annettu
  onkoVirheita = () : boolean =>{
    let ok : boolean = true;
    if (this.valuuttaLomake.value.kohdeControl==null){ 
      this.virhe1 = "Kohdevaluuttaa puuttuu.";
      ok=false;

    }
    if (this.valuuttaLomake.value.summaControl==null){
      this.virhe2 = "Summa puuttuu.";
      ok=false;
    }
    return ok;
  }

  //lähdevaluutta on vaihdettu lomakkeella
  vaihdaLahdevaluutta = () : void =>{
     this.valuuttalista.haeTiedot(this.valuuttaLomake.value.lahdeControl);  //uuden valuuttalistan haku
     //this.valuuttalista.teeValuuttaTaulukko(); //testausta varten
     this.valuuttaLomake.value.kohdeControl=null;                           //kohdevaluutta ei valituksi
     this.router.navigate(["/lomake"]);                                     //lomakenäkymän päivitys
  };

}

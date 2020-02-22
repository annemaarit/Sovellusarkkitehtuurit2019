//Maarit Parkkonen 2019, SaalisApp, lajilistanäkymän toiminnot
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lajit',
  templateUrl: './lajit.page.html',
  styleUrls: ['./lajit.page.scss'],
})
export class LajitPage implements OnInit {
  asetukset = {
    otsikko: "",
    vari: "",
    lajilista: [""],
    laji: ""
  };
  valittu: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  //laji on valittu, palautetaan tieto
  valintaTehty = (): void =>{
    this.modalCtrl.dismiss(this.asetukset);
  }

  //peruutettu, ei palautustietoa
  peruuta = () : void =>{
    this.modalCtrl.dismiss();
  }

  //lajin valintaa vaihdettu
  vaihdaLaji = (nimi: string) : void =>{
    this.asetukset.laji=nimi;
    this.valittu=true;
  }

}

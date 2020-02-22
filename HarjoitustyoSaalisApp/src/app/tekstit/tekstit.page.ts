//Maarit Parkkonen 2019, SaalisApp, uuden ilmoituksen tekstimodaalin toiminnot
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tekstit',
  templateUrl: './tekstit.page.html',
  styleUrls: ['./tekstit.page.scss'],
})
export class TekstitPage implements OnInit {
  asetukset = {
    otsikko: "",
    teksti: ""
  };

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() {
  }

  //tekstit on hyväksytty
  valmis = (): void =>{
    this.modalCtrl.dismiss(this.asetukset);
  }

  //paluu ilman tekstejä
  peruuta = () : void =>{
    this.modalCtrl.dismiss();
  }
}

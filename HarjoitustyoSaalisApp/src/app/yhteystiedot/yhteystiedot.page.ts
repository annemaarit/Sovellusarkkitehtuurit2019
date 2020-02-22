// Maarit Parkkonen 2019, uuden ilmoituksen yhteystietomodaalin toiminnot
import { Henkilo } from './../Henkilo';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yhteystiedot',
  templateUrl: './yhteystiedot.page.html',
  styleUrls: ['./yhteystiedot.page.scss'],
})
export class YhteystiedotPage implements OnInit {
  asetukset: Henkilo= {
    tunnus: "",
    etunimi: "",
    sukunimi: "",
    katuosoite: "",
    postinumero: "",
    postitoimipaikka: "",
    puhelin: "",
    email: ""
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  //yhteystiedot on hyväksytty
  valmis = (): void =>{
    this.modalCtrl.dismiss(this.asetukset);
  }

  //paluu ilman tietoja
  peruuta = () : void =>{
    this.modalCtrl.dismiss();
  }
}

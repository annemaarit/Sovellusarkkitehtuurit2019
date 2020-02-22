//Maarit Parkkonen, 2019, uuden ilmoituksen esikatselumodaalin toiminnot
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Ilmoitus } from '../Ilmoitus';
import { DbpalvelutService } from '../dbpalvelut.service';

@Component({
  selector: 'app-esikatselu',
  templateUrl: './esikatselu.page.html',
  styleUrls: ['./esikatselu.page.scss'],
})
export class EsikatseluPage implements OnInit {
  asetukset: Ilmoitus = {
    ilmoittaja: null,
    kuva: "",
    otsikko: "",
    teksti: "",
    alue: "",
    osasto: "",
    laji: "",
    toiminto: "",
    paivays: "",
    poistopvm: ""
  };

  constructor(private modalCtrl: ModalController,
              private dbpalvelut: DbpalvelutService) { }

  ngOnInit() {
  }
  
  //hyväksytty julkaistavaksi
  valmis = (): void =>{
    this.dbpalvelut.julkaise=true;
    this.modalCtrl.dismiss(this.asetukset);
  }

  //palataan muokkaamaan ilmoitusta
  peruuta = () : void =>{
    this.dbpalvelut.julkaise=false;
    this.modalCtrl.dismiss();
  }

}

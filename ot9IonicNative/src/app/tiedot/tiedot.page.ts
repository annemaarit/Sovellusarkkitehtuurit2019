//paikan näyttömodaalin toiminnot
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tiedot',
  templateUrl: './tiedot.page.html',
  styleUrls: ['./tiedot.page.scss'],
})
export class TiedotPage implements OnInit {
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  //modaalin sulkeminen
  sulje = (): void =>{
    this.modalCtrl.dismiss();
  }


}

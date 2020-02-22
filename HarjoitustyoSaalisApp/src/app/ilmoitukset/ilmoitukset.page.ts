//Maarit Parkkonen 2019, SaalisApp, ilmoitusten näyttönäkymän toiminnot
import { Component, OnInit } from '@angular/core';
import { DbpalvelutService } from '../dbpalvelut.service';

@Component({
  selector: 'app-ilmoitukset',
  templateUrl: './ilmoitukset.page.html',
  styleUrls: ['./ilmoitukset.page.scss'],
})
export class IlmoituksetPage implements OnInit {
  slideOpts = {setWrapperSize: true};
  dianro: number=1;
  eteenpain: boolean=true;    //ohjausnuolen oikealle näkyvyys
  taaksepain: boolean=false;  //ohjausnuolen vasemmalle näkyvyys

  constructor(private dbpalvelut:DbpalvelutService) {
  }

  ngOnInit() {
  }

  //sliderissa pyyhkäisty vasemmalle
  seuraavaDia = () : void => {
    this.dianro++;
    this.paivitaNuolet();
  }

  //sliderissa pyyhkäisty oikealle
  edellinenDia = () : void => {
    this.dianro--;
    this.paivitaNuolet();
  }

  //ohjausnuolien näkyvyyden päivitys
  paivitaNuolet = () : void => {
    if (this.dianro==1){                    //diat on alussa
      this.taaksepain=false;
    } else {
      this.taaksepain=true;
    }
    if (this.dianro==this.dbpalvelut.kpl){  //diat on lopussa
      this.eteenpain=false;
    }else{
      this.eteenpain=true;
    }
  }

}

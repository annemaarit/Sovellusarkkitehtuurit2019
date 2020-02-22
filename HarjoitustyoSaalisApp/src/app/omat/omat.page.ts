//Maarit Parkkonen 2019, käyttäjän omat ilmoitukset näkymän toiminnot
import { Component, OnInit } from '@angular/core';
import { DbpalvelutService } from '../dbpalvelut.service';

@Component({
  selector: 'app-omat',
  templateUrl: './omat.page.html',
  styleUrls: ['./omat.page.scss'],
})
export class OmatPage implements OnInit {
  slideOpts = {setWrapperSize: true};
  dianro: number=1;
  eteenpain: boolean=true;        //ohjausnuolen oikealle näkyvyys
  taaksepain: boolean=false;      //ohjausnuolen vasemmalle näkyvyys

  constructor(private dbpalvelut: DbpalvelutService) { }

  ngOnInit() {
  }

  //sliderissa pyyhkäisty vasemmalle
  seuraavaDia = () : void => {
    this.dianro++;
    if (this.dbpalvelut.kpl>1){
      this.paivitaNuolet();
    }
  }

  //sliderissa pyyhkäisty oikealle
  edellinenDia = () : void => {
    this.dianro--;
    if (this.dbpalvelut.kpl>1){
      this.paivitaNuolet();
    }
  }

  //ohjausnuolien näkyvyyden päivitys
  paivitaNuolet = () : void => {
    if (this.dianro==1){                      //diat on alussa
      this.taaksepain=false;
    } else {
      this.taaksepain=true;
    }
    if (this.dianro==this.dbpalvelut.kpl){    //diat on lopussa
      this.eteenpain=false;
    }else{
      this.eteenpain=true;
    }
  } 

  poista = () : void => {
    //under construction
  }

  muokkaa = () : void => {
    //under construction
  }


}

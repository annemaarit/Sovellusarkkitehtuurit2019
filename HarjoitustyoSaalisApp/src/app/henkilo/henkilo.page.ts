//Maarit Parkkonen 2019, henkilötietojen syöttönäkymän toiminnot
import { DbpalvelutService } from './../dbpalvelut.service';
import { Henkilo } from './../Henkilo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-henkilo',
  templateUrl: './henkilo.page.html',
  styleUrls: ['./henkilo.page.scss'],
})
export class HenkiloPage implements OnInit {
  //uuden henkilön tiedot
  uusi: Henkilo={
    tunnus: "",
    etunimi: "",
    sukunimi: "",
    katuosoite: "",
    postinumero: "",
    postitoimipaikka: "",
    puhelin: "",
    email: ""
  }

  constructor(private dbpalvelut: DbpalvelutService,
              private router: Router) { }

  ngOnInit() {
  }

  //henkilotietojen tallennus pyyntö ja ohjaus uuden ilmoituksen tekonäkymään
  tallennaHenkilo = ():void =>{
    this.dbpalvelut.lisaaHenkilo(this.uusi).then(():void=>{
      this.router.navigate(["/uusi"]);
    });
  }

}

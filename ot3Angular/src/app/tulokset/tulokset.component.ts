//@Maarit Parkkonen, 2019

import { Component, OnInit } from '@angular/core';
import { ValuuttalistaService } from '../valuuttalista.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tulokset',
  templateUrl: './tulokset.component.html',
  styleUrls: ['./tulokset.component.css']
})
export class TuloksetComponent implements OnInit {
  tulos : string;  //muunnoksen tulosteksti

  constructor(private valuuttalista: ValuuttalistaService, private router: Router){
  }

  ngOnInit() {
    this.tulos=this.valuuttalista.tulosviesti;
  }

}

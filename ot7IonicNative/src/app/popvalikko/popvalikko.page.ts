//@Maarit Parkkonen, 2019, ot7, kuvaussovellus: uusi/tallennettu kuvavalikko
import { KuvalistaService } from './../kuvalista.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popvalikko',
  templateUrl: './popvalikko.page.html',
  styleUrls: ['./popvalikko.page.scss'],
})
export class PopvalikkoPage implements OnInit {

  constructor(private kuvalista: KuvalistaService) { } //olio kuvalistapalveluihin

  ngOnInit() {
  }

}

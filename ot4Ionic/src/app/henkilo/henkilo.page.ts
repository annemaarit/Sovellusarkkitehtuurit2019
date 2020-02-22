//toisen näytön palveluolio

import { Component, OnInit } from '@angular/core';
import { MokkivarausService } from './../mokkivaraus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-henkilo',
  templateUrl: './henkilo.page.html',
  styleUrls: ['./henkilo.page.scss'],
})
export class HenkiloPage implements OnInit {

  constructor(private mokkivaraus: MokkivarausService, private router: Router) { }

  ngOnInit() {}

}

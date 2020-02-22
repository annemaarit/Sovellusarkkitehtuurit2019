//@Maarit Parkkonen, 2019
//uutinen sivun muuttujat ja toiminnot, ohjelmallisesti muodostuva

import { Uutinen } from './../uutinen';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UutislistaService } from '../uutislista.service';

@Component({
  selector: 'app-uutinen',
  templateUrl: './uutinen.page.html',
  styleUrls: ['./uutinen.page.scss'],
})
export class UutinenPage implements OnInit {

  uutinen: Uutinen;                                                     //näytettävä uutinen

  constructor(private route: ActivatedRoute, private uutislista: UutislistaService) {}

  ngOnInit() {
    let indeksi = Number(this.route.snapshot.paramMap.get("indeksi"));  //uutisen listanumero
    this.uutinen = this.uutislista.uutiset[indeksi];                    //uutisen poimiminen listalta
  }

}

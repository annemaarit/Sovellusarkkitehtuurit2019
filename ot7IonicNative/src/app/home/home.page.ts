//@Maarit Parkkonen, 2019, ot7, kuvaussovellus: päänäkymän toimintojen ohjaus
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { KuvalistaService } from './../kuvalista.service';
//import { IonSlides } from '@ionic/angular';
import { Kuva } from '../kuva';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  AfterViewInit {
  //kumpikaan alla olevista ei bindannut slideria...oletan
  @ViewChild('slides') slides: ElementRef;
  //@ViewChild('slides') slides: IonSlides;

  constructor(private kuvalista: KuvalistaService) {      //olio kuvalistapalveluihin
  }

  ngAfterViewInit(){
    this.paivitaDiat();
  }

//kuvan poistaminen
 poista = async (kuva: Kuva) : Promise<any> =>{
   await this.kuvalista.poistaKuva(kuva);               //kuvan poisto taulukosta
   this.paivitaDiat();                                  //sliderin päivitys.. ei toimi
 }

 //sliderin päivitys kuvalistan mukaiseksi.. huom! ei toimi
 paivitaDiat = () : void =>{
    this.slides.nativeElement.update();
    //this.slides.update();
  }
 
}

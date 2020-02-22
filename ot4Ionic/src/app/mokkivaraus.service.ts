//varauksen tietojen säilytys ja käsittelyt

import { Injectable } from '@angular/core';
//omat tietotyypit
import { Varaus } from './Varaus';
import { Mokki } from './Mokki';

@Injectable({
  providedIn: 'root'
})
export class MokkivarausService {

  //valittavat vakiomökit
  mokit: Mokki[]=[
    {id:1, nimi:"Honkalinna", hinta:220},
    {id:2, nimi:"Mäntymökki", hinta:140},
    {id:3, nimi:"Petäjälä", hinta:350},
    {id:4, nimi:"Kelotupa", hinta:60}
  ];

  //tyhjä varaus
  varaus: Varaus ={mokki:{id:0, nimi:"", hinta:0},alkuPvm:null,paivatKpl:1,siivous:false,summa:0,varaaja:{nimi:"",puhelin:"",email:"",maksutapa:""}};

  constructor() { }

  //varauksen tyhjennys
  tyhjennaVaraus = () : void =>{
    this.varaus ={mokki:{id:0, nimi:"", hinta:0},alkuPvm:null,paivatKpl:1,siivous:false,summa:0,varaaja:{nimi:"",puhelin:"",email:"",maksutapa:""}};
  }

}

//Maarit Parkkonen, 2019, Uuden ilmoituksen tekonäkymän toiminnot
import { KuvapalvelutService } from './../kuvapalvelut.service';
import { LajipalvelutService } from './../lajipalvelut.service';
import { Henkilo } from './../Henkilo';
import { Ilmoitus } from './../Ilmoitus';

import { DbpalvelutService } from './../dbpalvelut.service';

import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { maakunnat } from './../maakunnat';
import { TekstitPage } from './../tekstit/tekstit.page';
import { YhteystiedotPage } from '../yhteystiedot/yhteystiedot.page';
import { EsikatseluPage } from './../esikatselu/esikatselu.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uusi',
  templateUrl: './uusi.page.html',
  styleUrls: ['./uusi.page.scss'],
})
export class UusiPage implements OnInit {
  maakunnat:string[]=maakunnat;

  //uusi ilmoitus
  uusi: Ilmoitus = {
    ilmoittaja: null,
    kuva: "",
    otsikko: "",
    teksti: "",
    alue: "",
    osasto: "",
    laji: "",
    toiminto: "",
    paivays: "",
    poistopvm: ""
  }

  //käyttäjätiedot
  ilmoittaja: Henkilo={
    tunnus: "",
    etunimi: "",
    sukunimi: "",
    katuosoite: "",
    postinumero: "",
    postitoimipaikka: "",
    puhelin: "",
    email: ""
  }

  constructor(private modalCtrl: ModalController,
              private dialogiCtrl: AlertController,
              private dbpalvelut: DbpalvelutService,
              private lajipalvelut: LajipalvelutService,
              private kuvapalvelut: KuvapalvelutService,
              private router: Router) {
  }

  ngOnInit() {
    this.ilmoittaja=this.dbpalvelut.kayttaja;                 
  }

  //lajilistamodaalin avaus
  // -parametrina valittu lajiosasto
  avaaLajilista = async (osastoNro:number) : Promise<any> =>{
    await this.lajipalvelut.lajiLuettelo(osastoNro,false)
  }

  //kaikkien ilmoitustietojen tyhjennys
  tyhjenna = () : void =>{
    this.lajipalvelut.tyhjennaValinnat();
    this.kuvapalvelut.tyhjenna();
    this.uusi = {
      kuva: "",
      otsikko: "",
      teksti: "",
      alue: "",
      osasto: "",
      laji: "",
      toiminto: "",
      paivays: "",
      poistopvm: ""
    };
  }

  //tekstitmodaalin avaus
  lisaaTekstit = async (): Promise<any> => {
        let oletusAsetukset = {
          otsikko: this.uusi.otsikko,
          teksti: this.uusi.teksti
        }
    
        const modaali1 = await this.modalCtrl.create({
          component: TekstitPage,
          componentProps: {asetukset: oletusAsetukset}
        });
        
        await modaali1.present();
    
        modaali1.onDidDismiss().then((asetukset)=>{
          if (asetukset){
            this.uusi.teksti = asetukset.data.teksti;
            this.uusi.otsikko = asetukset.data.otsikko;
          } else {
            
          }
        });
    }

  //kuvan lisäys ilmoitukseen
  lisaaKuva = ():void =>{
      this.kuvapalvelut.kysyKuvalahde(); 
  }

//yhteystiedotmodaalin avaus
 muokkaaYhteystiedot = async (): Promise<any> => {
    let oletusAsetukset=this.ilmoittaja;
    if ((this.dbpalvelut.kayttaja!=null)&&(this.ilmoittaja.etunimi=="")){
      this.ilmoittaja= this.dbpalvelut.kayttaja;
      oletusAsetukset = this.dbpalvelut.kayttaja;
    }

    const modaali2 = await this.modalCtrl.create({
      component: YhteystiedotPage,
      componentProps: {asetukset: oletusAsetukset}
    });
    
    await modaali2.present();

    modaali2.onDidDismiss().then((asetukset)=>{
      if (this.dbpalvelut.tallennaHenkilo){
        this.ilmoittaja=asetukset.data;
        this.dbpalvelut.muokkaaHenkilo(this.ilmoittaja);
        this.dbpalvelut.tallennaHenkilo=false;
      }
    });
  }

  //esikatselumodaalin avaus
  esikatsele = async (): Promise<any> => {
    this.teeUusiIlmoitus();

    let oletusAsetukset = this.uusi;

    const modaali3 = await this.modalCtrl.create({
      component: EsikatseluPage,
      componentProps: {asetukset: oletusAsetukset}
    });
    
    await modaali3.present();

    modaali3.onDidDismiss().then((asetukset)=>{
      if (this.dbpalvelut.julkaise){
        this.tallennaUusiIlmoitus();
      }
    });
  }

  //muodostaa uuden ilmoitusobjektin
  teeUusiIlmoitus = () : void => {
    let paivays: string;
    let nyt : Date;
    this.uusi.laji=this.lajipalvelut.lajiNimi;
    this.uusi.osasto=this.lajipalvelut.osasto;
    this.uusi.kuva=this.kuvapalvelut.kuva;
    this.uusi.ilmoittaja=this.ilmoittaja;
    nyt = new Date();
    paivays = nyt.getDate()+"."+(nyt.getMonth()+1)+"."+nyt.getFullYear()+" "+nyt.getHours()+":"+nyt.getMinutes();
    this.uusi.paivays=paivays;
  }

  //pyytää ilmoituksen tallennusta
  tallennaUusiIlmoitus = () : void => {
    this.dbpalvelut.lisaaIlmoitus(this.uusi,this.ilmoittaja.id).then(()=>{                    //tallennuspyyntö tietokantaan
        this.tyhjenna();                                                                      //tietojen tyhjäys
        this.avaaInfo("Ilmoitus julkaistu","Ilmoituksesi on nyt tallennettu ja julkaistu.");  //infodialogi
          this.dbpalvelut.julkaise=false;
          this.router.navigate(["/home"]);
    });
  }

  //infodialogin avaus
  avaaInfo = async (otsikko: string, viesti: string) : Promise<any> => {
    const ikkuna = await this.dialogiCtrl.create({
                    header: otsikko,
                    message: viesti,
                    buttons: ["Ok"]
    });
    await ikkuna.present();
  }

    /*kysyYhteystiedot = async () : Promise<any> => {
      const ikkuna = await this.dialogiCtrl.create({
                      header: "Uusi ilmoitus",
                      message: "Kirjoita Yhteystietosi",
                      inputs:[
                        {
                          name:"etunimi",
                          type: "text",
                          placeholder: "Etunimi.."
                        },
                        {
                          name:"sukunimi",
                          type: "text",
                          placeholder: "Sukunimi.."
                        },
                        {
                          name:"katuosoite",
                          type: "text",
                          placeholder: "Katuosoite.."
                        },
                        {
                          name:"postinumero",
                          type: "text",
                          placeholder: "Postinumero.."
                        },
                        {
                          name:"postipaikka",
                          type: "text",
                          placeholder: "Postitoimipaikka.."
                        },
                        {
                          name:"puhelin",
                          type: "text",
                          placeholder: "Puhelinnumero.."
                        },
                        {
                          name:"email",
                          type: "text",
                          placeholder: "Sähköposti.."
                        }
                        ],
                      buttons:[
                        {
                          text:"Valmis",
                          handler:(data:any) => {
                            this.etunimi = data.etunimi;
                            this.sukunimi = data.sukunimi;
                            this.katuosoite = data.katuosoite;
                            this.postinumero = data.postinumero;
                            this.postipaikka = data.postipaikka;
                            this.puhelin = data.puhelin;
                            this.email = data.email;
                          }
                        },
                        {
                          text: "Peruuta",
                          role: "cancel",
                          cssClass: "secondary"
                        }
                      ]
                });
      await ikkuna.present();
    }*/

}

// @Maarit Parkkonen, Ot8, Sijaintimuistio, päänäkymän toiminnot
import { KamerapalvelutService } from './../kamerapalvelut.service';
import { UusiPage } from '../uusi/uusi.page';
import { TiedotPage } from './../tiedot/tiedot.page';
import { Sijainti } from './../Sijainti';
import { DbpalvelutService } from './../dbpalvelut.service';
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  virhe: string = "home tilanne";
  uusiKuva: boolean=null;

constructor(private dbpalvelut: DbpalvelutService,          //tietokantapalveluiden olio
            private kamerapalvelut: KamerapalvelutService,  //kamerapalveluiden olio
            private dialogiCtrl: AlertController,
            private modalCtrl: ModalController){}

//uuden paikan lisäyksen aloitus
uusiPaikka = () : void =>{                                  
    this.kysyPaikka();
}

//uuden paikan tietojen kyselymodaali
kysyPaikka = async (): Promise<any> =>{
  let sijaintitiedot: Sijainti;

  const modaali1 = await this.modalCtrl.create({                        //luodaan kyselymodaali
                            component: UusiPage,                        //modaalin sisältö
                            componentProps: {kysely : sijaintitiedot}   //modaalin kanssa jaettavat tiedot
                            });
  await modaali1.present();                           //modaalin avaus                           

  modaali1.onDidDismiss().then((kysely)=>{            //modaalin sulkemisen jälkeen
    if (kysely){                                      //jos tiedot on annettu
      this.dbpalvelut.lisaaUusiPaikka(kysely.data);   //pyydetään tietojen lisäystä tietokantaan
    }
  });
}

//valitun paikan tietojen näyttömodaali
naytaTiedot = async (paikka: any): Promise<any> =>{
  const modaali2 = await this.modalCtrl.create({                //luodaan näyttömodaali
                            component: TiedotPage,              //modaalin sisältö
                            componentProps: {"paikka" : paikka} //modaalille välitettävät tiedot
                            });
    
  await modaali2.present();                                     //modaalin avaus
}

//kysymysikkuna haettavan kuvan lähteestä: kamerasta vai tallennetuista
//        - parametrina paikan id -tunnus, johon kuva liittyy
kysyKuvalahde = async (id: number): Promise<any>=>{
  const ikkuna = await this.dialogiCtrl.create({                //luodaan kysymysikkuna
                            header:"Lisää kuva",
                            buttons:[
                              {
                                text:"Uusi kuva",               //kamerasta
                                handler:()=>{
                                  this.uusiKuva=true;
                                }
                              },
                              {
                                text:"Tallennettu",             //muistista
                                handler:()=>{
                                  this.uusiKuva=false;
                                }
                              }
                              ,
                              {
                                text:"Peru",                    //peruutaan toiminto
                                role:"cancel",
                                handler:()=>{
                                  this.uusiKuva=null;
                                }
                              }
                            ]

  });
  await ikkuna.present();                                       //ikkunan avaus
  ikkuna.onDidDismiss().then(()=>{                              //ikkunan sulkemisen jälkeen
    this.teeKuva(id);                                           //pyydetään uuden kuvan muodostamista
  });
}

//uuden kuvan muodostus ja tallennuksen pyyntö
teeKuva = async (id:number): Promise<any> =>{
  if (this.uusiKuva!=null){                                     //jos kuvaa ei ole peruttu
    await this.kamerapalvelut.otaKuva(this.uusiKuva);           //pyydetään kuvan ottoa tai hakua
    this.uusiKuva=null;                                         
    if (this.kamerapalvelut.kuva!=""){                          //jos kuvatieto saatiin
      this.dbpalvelut.tallennaKuva(id,this.kamerapalvelut.kuva);//pyydetään kuvan tallennusta tietokantaan
      this.kamerapalvelut.kuva="";
    }
  }
}

//valitun paikan poistamisen varmistus ja poistamisen pyyntö
poistaPaikka = async (paikka:Sijainti): Promise<any> =>{
  const ikkuna = await this.dialogiCtrl.create({             //ikkunan luonti
    header: "Paikan poisto",
    message: "Poistetaanko: "+paikka.otsikko+"?",
    buttons: [
      {
        text: "Poista",                                     //poistaminen varmistettu
        cssClass: "primary",
        handler:(data:any)=>{
          this.dbpalvelut.poistaPaikanTiedot(paikka.id);   //pyydetään paikan poistamista tietokannasta
        }
      },
      {
        text: "Peru",                                       //ei poisteta, ikkunan sulku
        role: "cancel",
        cssClass: "secondary"
      }
    ]
  });
  await ikkuna.present();                                   //ikkuna näkyviin
}

}

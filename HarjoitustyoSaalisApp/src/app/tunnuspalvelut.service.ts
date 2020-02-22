//Maarit Parkkonen, 2019, SaalisApp, käyttäjätunnuksen palvelut
import { DbpalvelutService } from './dbpalvelut.service';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TunnuspalvelutService {
  onkoUusi: boolean;

  constructor(private dialogiCtrl: AlertController,
              private router: Router,
              private dbpalvelut: DbpalvelutService) { }

  //kysymysdialogi, josta käyttäjä valitsee tilanteensa: on tunnus, ei ole tai peru
  kysyIlmoittaja = async () : Promise<any> => {

    const ikkuna = await this.dialogiCtrl.create({
                    header: "Uusi ilmoitus",
                    buttons:[
                      {
                        text:"Olen uusi ilmoittaja",
                        handler:() => {
                          //this.teeTunnus();
                          this.router.navigate(["/henkilo"]);
                        }
                      },
                      {
                        text: "Minulla on tunnus",
                        handler:() => {
                          this.kysyTunnus(false);
                        }
                      },
                      {
                        text: "Peru",
                        role: "cancel",
                        cssClass: "secondary"
                      }
                    ]
    });
    await ikkuna.present();
  }

  //syöttödialogi tunnukselle
  kysyTunnus = async (onkoOmat:boolean) : Promise<any> => {
    const ikkuna = await this.dialogiCtrl.create({
                    header: "Oma tunnus",
                    inputs:[
                      {
                        name:"tunnus",
                        type: "text",
                        placeholder: "Kirjoita tunnuksesi.."
                      }
                    ],
                    buttons:[
                      {
                        text: "Peru",
                        role: "cancel"
                      },
                      {
                        text:"Valmis",                                  //tunnus annettu
                        cssClass: "secondary",
                        handler:(data:any) => {
                          this.dbpalvelut.haeIlmoittaja(data.tunnus).then(async (): Promise<any>=>{ //tunnuksen perusteella käyttäjän tietojen haku
                            if (this.dbpalvelut.kayttaja==null){                                    //tunnusta ei löydy
                              this.avaaInfo("Tunnus virheellinen","Valitettavasti antamallasi tunnuksella ei löytynyt käyttäjätietoja. Yritä uudelleen.");
                            } else {                                                                //tunnus löytyi
                              if (onkoOmat){                                                        //jos siirrytään omiin ilmoituksiin
                                await this.dbpalvelut.haeOmatIlmoitukset(this.dbpalvelut.kayttaja.id);  //haetaan omat ilmoitukset
                                if (this.dbpalvelut.kpl!=0){                                        //jos on omia ilmoituksia
                                  this.router.navigate(["/omat"]);
                                }
                                else {                                                              //jos ei ole omia ilmoituksia
                                  this.avaaInfo("Ei ilmoituksia","Sinulla ei ole julkaistuna yhtään ilmoitusta.");
                                }
                                
                              } else {                                                              //jos siirrytään uuteen ilmoitukseen 
                                this.router.navigate(["/uusi"]);
                              }
                            }
                            
                          });
                        }
                      }
                    ]
    });
    await ikkuna.present();
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
}

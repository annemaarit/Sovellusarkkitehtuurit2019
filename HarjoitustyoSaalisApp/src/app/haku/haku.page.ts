//Maarit Parkkonen, 2019, hakunäkymän toiminnot
import { DbpalvelutService } from './../dbpalvelut.service';
import { maakunnat } from './../maakunnat';
import { maakunnatPicker } from '../maakunnatPicker';

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LajipalvelutService } from '../lajipalvelut.service';


@Component({
  selector: 'app-haku',
  templateUrl: './haku.page.html',
  styleUrls: ['./haku.page.scss'],
})
export class HakuPage implements OnInit {
  popover: any;
  alue: string="";
  toiminto: string="";
  maakunnat:string[]=maakunnat;
  mkunnat:object[]=maakunnatPicker;
  
  constructor(
    private infoCtrl: AlertController,
    private dbpalvelut: DbpalvelutService,
    private lajipalvelut: LajipalvelutService,
    private router: Router
  ) { }

  ngOnInit() {}

  //lajilistamodaalin avaus
  // -parametrina valittu lajiosasto
  valitseLaji = async (osastoNro:number) : Promise<any> =>{
    await this.lajipalvelut.lajiLuettelo(osastoNro,true);
  }

  hakuOk = () : void =>{}

  //kaikkien hakutietojen tyhjennys
  tyhjenna = () : void =>{
    this.lajipalvelut.tyhjennaValinnat();
    this.alue = "";
    this.toiminto = "";
  }

  //haun valmistelu ja pyyntö
  haeIlmoitukset = async () : Promise<any> => {
    let laji: string;
    let alue: string;
    let osasto: string;

    if (this.lajipalvelut.lajiNimi=="kaikki"){        //jos valittu kaikki lajiosaston lajit
      laji="";
      osasto=this.lajipalvelut.osasto;
    }else{                                            //yksittäinen laji valittu
      laji=this.lajipalvelut.lajiNimi;
      osasto="";
    }
    if (this.alue=="koko Suomi"){                     //jos alueena koko Suomi
      alue="";
    }else{                                            //jos yksittäinen alue valittu
      alue=this.alue;
    }

    await this.dbpalvelut.haeIlmoitukset(laji,osasto,this.toiminto,alue); //hakupyyntö

    if (this.dbpalvelut.kpl!=0){                      //jos hakua vastaavia ilmoituksia löytyi
      this.tyhjenna();                                //hakuehtojen tyhjennys
      this.router.navigate(["/ilmoitukset"]);         //ilmoitusnäkymään
    } else {                                          //jos haulla ei tuloksia
      this.avaaInfo("Ei ilmoituksia","Valitettavasti antamillasi hakuehdoilla ei löytynyt yhtään ilmoitusta. Muuta hakuehtoja ja yritä uudelleen.");
    }

  }

  //infodialogin avaus
  avaaInfo = async (otsikko: string, viesti: string) : Promise<any> => {
    const ikkuna = await this.infoCtrl.create({
                    header: otsikko,
                    message: viesti,
                    buttons: ["Ok"]
    });
    await ikkuna.present();
  }

    //https://github.com/ionic-team/ionic/issues/15099
  /*async openPicker() {
      const picker = await this.pickerCtrl.create({
        buttons: [
          {
            text: 'Peru'
          },
          {
            text: 'Valmis',
            handler:(data:any)=>{
              this.testi=data;
            }
          }
        ],
        columns: [
          {
            name: 'Alue',
            options: this.mkunnat
          }
        ]
      });
      await picker.present();

      picker.onDidDismiss().then(()=>{

      });
  }*/

}

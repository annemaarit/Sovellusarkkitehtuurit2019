//@Maarit Parkkonen, 2019, ot7, kuvaussovellus: kuvapalvelut
import { PopvalikkoPage } from './popvalikko/popvalikko.page';
import { Injectable } from '@angular/core';
import { Kuva } from './kuva';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, Platform, PopoverController } from '@ionic/angular';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class KuvalistaService {
  leveys: number = 0;                       //kuvan leveys
  korkeus: number = 0;                      //kuvan korkeus
  kuva: string = "";                        //kuvan base64 tiedot
  kuvat: Kuva[]=[];                         //kuvalista
  kuvavirhe: string = "Aloita kuvien ottaminen..";                   
  kpl: number = 0;                          //otettujen kuvien kpl
  taynna: boolean = false;                  //kuvia > 4 -> true
  popover: any;                             //Uusi vai tallennettu kuva -popupvalikko

  constructor(
    private kamera: Camera,
    private alertCtrl: AlertController,
    private laite: Platform,
    private router: Router,
    private popoverCtrl: PopoverController
  ) {
    if (this.laite.isPortrait){            //otettavan kuvan mitat, jos laite vaakatasossa
      this.leveys=this.laite.width();      //tämä toimii IOS:ssä hyvin
      this.korkeus=this.laite.height();
    } else{                                
      this.korkeus=this.laite.width();
      this.leveys=this.laite.height();
    }
   }

  //Uusi vai tallennettu kuva -popupvalikon avaus
  avaaPop = async (ev:any) : Promise<any> =>{
    this.popover = await this.popoverCtrl.create({
      animated: true,
      component: PopvalikkoPage,      //popupin sisältösivu
      event: ev,
      translucent: true
    });
    await this.popover.present();
  }

  //
  otaKuva = (kameralla: boolean): void =>{
    let lahdeTyyppi: number;
    if (kameralla){
      lahdeTyyppi=1;                  //käytetään kameraa
    } else {
      lahdeTyyppi=2;                  //haetaan tallennetuista kuvista
    }
    let asetukset:CameraOptions={     //kuvausasetukset
          quality: 70,
          destinationType:0,          //DATA_URL base64 string
          sourceType: lahdeTyyppi,       
          targetWidth: this.leveys,
          targetHeight: this.korkeus
    }

    this.popover.dismiss();           //sulkee Uusi vai tallennettu kuva -popupvalikon
    
    this.kamera.getPicture(asetukset).then((kuvadata)=>{    //avaa kamerasovelluksen
      this.kuvavirhe = "";                                  //kuva otettu
      this.kuva=`data:image/jpeg;base64,${kuvadata}`;       //kuvan base64 tiedot
      this.kpl++;
      this.kuvalleNimi(this.kuva).then(()=>{                //kuvan nimitiedot
        this.router.navigate(["/home"]);  
      });          
    }).catch((err)=>{
      this.kuvavirhe="Kuvaus keskeytetty tai se epäonnistui."
    });
  }

  //dialogi-ikkuna, jossa voi antaa kuvalle nimen
  kuvalleNimi = async (kuva:string): Promise<any> =>{
    const ikkuna = await this.alertCtrl.create({             //ikkunan luonti
        header: "Kuvan nimi",
        inputs: [                                             
          {
            name: "nimi",                                    //tekstikenttä
            type: "text",
            placeholder: "Kirjoita kuvan nimi.."
          }
        ],
        buttons: [
          {
            text: "Nimeä kuva",                              //tiedot ok
            cssClass: "primary",
            handler:(data:any)=>{
              let kuvatiedot: Kuva = {                       //uusi kuvaobjekti
                id: this.kpl,
                base64Tiedot:kuva,
                nimi: data.nimi
              }
              this.kuvat.unshift(kuvatiedot);               //lisätään uusi kuva taulukkoon
              //if (this.kpl>4){                            //tarkistetaan onko kpl määrä täynnä
              //  this.taynna=true;
              //}
            }
          },
          {
            text: "Peruuta",                                  //toiminnan peruutus (ei nimeä), ikkunan sulku
            role: "cancel",
            cssClass: "secondary",
            handler:(data:any)=>{
              let kuvatiedot: Kuva = {                       //uusi kuvaobjekti     
                id: this.kpl,
                base64Tiedot:kuva,
                nimi: `nimetön${this.kpl}`                   //kuvalle nimeksi nimetön+kpl
              }
              this.kuvat.unshift(kuvatiedot);                //lisätään uusi kuva taulukkoon
            }
          }
        ]
    });
    await ikkuna.present();                                   //ikkuna näkyviin
}

//dailogi -ikkuna, joka varmistaa kuvan poistamisen
poistaKuva = async (kuva:Kuva): Promise<any> =>{
  const ikkuna = await this.alertCtrl.create({          //ikkunan luonti
    header: "Kuvan poisto",
    message: "Poistetaanko kuva: "+kuva.nimi+"?",
    buttons: [
      {
        text: "Poista",                                //poista painike
        cssClass: "primary",
        handler:async (data:any)=>{
          await this.poistoTaulusta(kuva.id);          //odotetaan kuvan poisto
        }
      },
      {
        text: "Peru",                                  //toiminnan peruutus, ikkunan sulku
        role: "cancel",
        cssClass: "secondary"
      }
    ]
  });
  await ikkuna.present();                              //ikkuna näkyviin
}

//poistaa id -parametrin mukaisen kuvan kuvat -taulusta
poistoTaulusta = (id: number) : void =>{
  let pituus = this.kuvat.length;
  let apuId = 0;
  while ((this.kuvat[apuId].id!=id)&&(apuId<pituus)){    //etsitään kuva, jolla annettu id
    apuId++;
  };
  if (apuId<pituus){                                    //jos kuva löytyi
    this.kuvat.splice(apuId,1);                         //poistetaan se         
  } else {
    this.kuvavirhe="Poistaminen epäonnistui. Kuvan tunnusta ei löytynyt."
  } 
}

}

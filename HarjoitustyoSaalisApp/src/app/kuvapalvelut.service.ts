//@Maarit Parkkonen, 2019, SaalisApp: kuvapalvelut
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, Platform } from '@ionic/angular';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class KuvapalvelutService {
  leveys: number = 0;                       //kuvan leveys
  korkeus: number = 0;                      //kuvan korkeus
  kuva: string = "";                        //kuvan base64 tiedot
  kuvavirhe: string = "";                   

  constructor(
    private kamera: Camera,
    private dialogiCtrl: AlertController,
    private laite: Platform,
    private router: Router,
  ) {
    if (this.laite.isPortrait){            //otettavan kuvan mitat, jos laite vaakatasossa
      this.leveys=this.laite.width();      //tämä toimii IOS:ssä hyvin
      this.korkeus=this.laite.height();
    } else{                                
      this.korkeus=this.laite.width();
      this.leveys=this.laite.height();
    }
   }


  lisaaKuva = (kameralla: boolean): void =>{
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
    
    this.kamera.getPicture(asetukset).then((kuvadata)=>{    //avaa kamerasovelluksen
      this.kuvavirhe = "";                                  //kuva otettu
      this.kuva=`data:image/jpeg;base64,${kuvadata}`;       //kuvan base64 tiedot
      this.router.navigate(["/uusi"]);        
    }).catch((err)=>{
      this.kuvavirhe="Kuvaus keskeytetty tai se epäonnistui."
    });
  }

  //kuvalähteen valintadialogi
  kysyKuvalahde = async () : Promise<any> => {
    const ikkuna = await this.dialogiCtrl.create({
                    header: "Lisää kuva",
                    buttons:[
                      {
                        text:"Otan uuden kuvan",
                        handler:() => {
                          this.lisaaKuva(true);
                        }
                      },
                      {
                        text:"Valitsen muistista",
                        handler:() => {
                          this.lisaaKuva(false);
                        }
                      },
                      {
                        text: "Peruutan",
                        role: "cancel",
                        cssClass: "secondary"
                      }
                    ]
    });
    await ikkuna.present();
  }

  //kuvatietojen tyhjäys
  tyhjenna = () => {
    this.kuva="";
    this.kuvavirhe="";
  }

}

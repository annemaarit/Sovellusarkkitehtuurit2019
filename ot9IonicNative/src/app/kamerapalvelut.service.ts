// @Maarit Parkkonen, Ot8, Sijaintimuistio, kameraan liittyvät palvelut
import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KamerapalvelutService {
  kuva: string = "";                  //base64 muodossa
  kuvavirhe: string = "";

  constructor(private kamera: Camera,
              private router: Router) { }

  //kuvan otto kameralla tai tallennetun haku muistista
  otaKuva = async (kameralla: boolean): Promise<any>  =>{
    let lahdeTyyppi: number;
    if (kameralla){
      lahdeTyyppi=1;                    //uusi kuva kameralla
    } else {
      lahdeTyyppi=2;                    //tallennettu kuva
    }
    let asetukset:CameraOptions={
          quality: 70,
          destinationType:0,            //DATA_URL base64 string
          sourceType: lahdeTyyppi,       
          targetWidth: 320,
          targetHeight: 220
    }

    await this.kamera.getPicture(asetukset).then((kuvadata)=>{ //avaa kamerasovelluksen
      this.kuvavirhe = "";
      this.kuva=`data:image/jpeg;base64,${kuvadata}`;    
      //this.router.navigate(["/home"]);  
    }).catch((err)=>{
      this.kuva="";
      this.kuvavirhe="Kuvaus keskeytetty tai se epäonnistui."
    });
  }
}

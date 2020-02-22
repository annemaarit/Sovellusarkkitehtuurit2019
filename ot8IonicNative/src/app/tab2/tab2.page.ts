// @Maarit Parkkonen, Ot8, QR-koodin luku ja avaus sovelluksen sisäiseen selaimeen, toiminnot
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  virhe: string="";

  constructor(private qrSkanneri: BarcodeScanner,
              private iab: InAppBrowser,            //sovelluksen sisäisen selaimen olio
              private platform: Platform){}         //laitetietoja varten

  skannaaQR = () : void =>{
    this.qrSkanneri.scan().then(data => {           //avaa skannauspluginin
      let url: string =data.text;                   //skannauksen tekstitulos eli sivun url
      if (url!=""){                                 //jos skannaus onnistui
        let target: string="_blank";                  //avataan uuteen ikkunaan sovelluksen sisällä
        let options: string="location=yes";           //selaimen asetukset
  
        this.platform.ready().then(async()=>{         //kun laite on valmis
          const selain=await this.iab.create(url,target,options); //luodaan sisäinen selain, verkko-osoitteena skannattu url
          selain.show;                                            //selain näkyviin
        });
      }
     }).catch(err => {
         this.virhe="Skannauksessa tapahtui virhe: "+err+". Yritä hetken kuluttua uudelleen."
     });
  }
//https://github.com/ionic-team/ionic-v3/issues/108
//https://www.youtube.com/watch?v=Z7KqlvQm3oU
}


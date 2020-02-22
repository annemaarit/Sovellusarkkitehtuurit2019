// @Maarit Parkkonen, Ot8, Sijaintimuistio, tietokantaan liittyvät palvelut
//https://www.tutorialspoint.com/sqlite/sqlite_syntax.htm

import { Platform, NumericValueAccessor } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Sijainti } from './Sijainti';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbpalvelutService {
  paikkalista: Sijainti[]=[];                             //kannasta haetut paikat taulukko
  testi: any = {                                          //testipaikkoja
    lat: 60.123456,
    lon: 56.123456,
    pvm: new Date(),
    otsikko: "Hyvä katiskapaikka",
    teksti: "Ahvenia ja haukia ison kiven vierestä"
  };
  testi2: any = {
    lat: 60.11111,
    lon: 56.22222,
    pvm: new Date(),
    otsikko: "Paljon mustatorvisieniä",
    teksti: "Pihlajan alla oleva pieni aukio, mustikan varpujen seassa."
  };
  db:SQLiteObject;                                        //tietokantaobjekti

  constructor(private sqlite: SQLite,                      //tietokanta olio
              private platform: Platform) {                //laite olio
  this.avaaTietokanta();
  }

  avaaTietokanta = () : void =>{
    this.platform.ready().then(async () =>{                //onko laite valmis
        this.db= await this.sqlite.create({                //tietokannan luonti ja/tai yhteyden muodostaminen
                    name: 'sijaintimuistio.db',
                    location: 'default'
        });
        
        //taulujen poisto
        await this.db.executeSql("DROP TABLE paikat;",[]);      
        await this.db.executeSql("DROP TABLE kuvat;",[]);   

        //taulujen luonti
        await this.db.executeSql("CREATE TABLE IF NOT EXISTS paikat(id INTEGER PRIMARY KEY, lat REAL, lon REAL, pvm TEXT, otsikko TEXT, teksti TEXT);",[]);
        await this.db.executeSql("CREATE TABLE IF NOT EXISTS kuvat(id INTEGER PRIMARY KEY, paikkaid INTEGER, kuva TEXT);",[]);

        //testitietoja
        await this.db.executeSql("INSERT INTO paikat(lat,lon,pvm,otsikko,teksti) VALUES (?,?,?,?,?);",[this.testi.lat,this.testi.lon,this.testi.pvm,this.testi.otsikko,this.testi.teksti]);
        await this.db.executeSql("INSERT INTO paikat(lat,lon,pvm,otsikko,teksti) VALUES (?,?,?,?,?);",[this.testi2.lat,this.testi2.lon,this.testi2.pvm,this.testi2.otsikko,this.testi2.teksti]);        
        this.paivitaLista();
      }); 
  } 

  //paikkalistan päivitys
  paivitaLista = async () : Promise<any> =>{
    let kuvalista: string[]=[];                                           //yhden paikan kuvat
    let hakutulos = await this.db.executeSql("SELECT * FROM paikat",[]);  //kaikki paikat tietokannasta
    let paikkaId: number;
    
    this.paikkalista=[];
  
    for (let i=0;i<hakutulos.rows.length;i++){                            //paikkojen läpikäynti
        paikkaId=hakutulos.rows.item(i).id;                               

        //haetaan yhden paikan kaikki kuvat kuvalistaan
        let kuvahaku = await this.db.executeSql("SELECT * FROM kuvat WHERE paikkaid=?;",[paikkaId])
        kuvalista=[];
        for (let j=0; j<kuvahaku.rows.length;j++){
            kuvalista.push(kuvahaku.rows.item(j).kuva);
        };

        //lisätään paikka paikkalistaan
        this.paikkalista.push({
                id: paikkaId,
                lat: hakutulos.rows.item(i).lat,
                lon: hakutulos.rows.item(i).lon,
                pvm: hakutulos.rows.item(i).pvm,
                otsikko: hakutulos.rows.item(i).otsikko,
                teksti: hakutulos.rows.item(i).teksti,
                kuvat: kuvalista                              
        });
    }    
  } 

  //uuden paikan tallennus tietokantaan
  lisaaUusiPaikka = async (paikka:Sijainti):Promise<any>=>{
    await this.db.executeSql("INSERT INTO paikat(lat,lon,pvm,otsikko,teksti) VALUES (?,?,?,?,?);",[paikka.lat,paikka.lon,paikka.pvm,paikka.otsikko,paikka.teksti]);
    this.paivitaLista();
  }

  //uuden kuvan tallennus tietokantaan
  tallennaKuva = async (id: number, kuva: string):Promise<any>=>{
    await this.db.executeSql("INSERT INTO kuvat(paikkaid,kuva) VALUES (?,?);",[id,kuva]);
    this.paivitaLista();
  }

  //paikan ja siihen liittyvien kuvien poisto tietokannasta
  poistaPaikanTiedot = async (id: number): Promise<any>=>{
    await this.db.executeSql("DELETE FROM paikat WHERE id=?;",[id]);      //paikka
    await this.db.executeSql("DELETE FROM kuvat WHERE paikkaid=?;",[id]); //kuvat
    this.paivitaLista();
  }
}

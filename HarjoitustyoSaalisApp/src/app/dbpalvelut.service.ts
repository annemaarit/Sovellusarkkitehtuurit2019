// @Maarit Parkkonen, SaalisApp, tietokantaan liittyvät palvelut
import { Platform} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Henkilo } from './Henkilo';
import { Ilmoitus } from './Ilmoitus';
import { testiHenkilot } from './testihenkilot';
import { testiIlmoitukset } from './testiIlmoitukset';



@Injectable({
  providedIn: 'root'
})
export class DbpalvelutService {
  //kayttajatunnus: string = "";                            
  kayttaja: Henkilo = null;                               //käyttäjän tiedot
  ilmoituslista: Ilmoitus[]=[];                           //kannasta haetut ilmoitukset taulukko
  kpl : number = 0;                                       //ilmoitusten määrä
  virhe: any;
  testi: string="";
  julkaise: boolean=false;                                //apumuuttuja esikatselumodaalia varten
  tallennaHenkilo: boolean=false;                         //apumuuttuja ???

  testiIlmoitukset: Ilmoitus[] =testiIlmoitukset;         //testi-ilmoitusten taulukko
  testiHenkilot: Henkilo[] = testiHenkilot;               //testihenkilöiden taulukko

  db:SQLiteObject;                                        //tietokantaobjekti

  constructor(private sqlite: SQLite,                      //tietokanta olio
              private platform: Platform) {                //laite olio
      this.avaaTietokanta();
  }

 avaaTietokanta = () : void =>{
  
    this.platform.ready().then(async () =>{                //onko laite valmis

      try{
      
      this.db= await this.sqlite.create({                 //tietokannan luonti ja/tai yhteyden muodostaminen
              name: 'saalis.db',
              location: 'default'
      });
      
      //taulujen poisto
      await this.db.executeSql("DROP TABLE ilmoitukset;",[]);      
      await this.db.executeSql("DROP TABLE henkilot;",[]);   

      //taulujen luonti
      await this.db.executeSql("CREATE TABLE IF NOT EXISTS ilmoitukset(id INTEGER PRIMARY KEY, henkiloId INTEGER, kuva TEXT, otsikko TEXT, teksti TEXT, alue TEXT, osasto TEXT, laji TEXT, toiminto TEXT, paivays TEXT);",[]);
      await this.db.executeSql("CREATE TABLE IF NOT EXISTS henkilot(id INTEGER PRIMARY KEY, tunnus TEXT, etunimi TEXT, sukunimi TEXT, katuosoite TEXT, postinumero TEXT, postitoimipaikka TEXT, puhelin TEXT, email TEXT);",[]);

      //testitietoja HUOM! Ilmoituksia ja henkilöitä oltava samanverran!!
      for (let i = 0; i < testiIlmoitukset.length; i++) {
        await this.db.executeSql("INSERT INTO henkilot(tunnus,etunimi,sukunimi,katuosoite,postinumero,postitoimipaikka,puhelin,email) VALUES (?,?,?,?,?,?,?,?);",[this.testiHenkilot[i].tunnus,this.testiHenkilot[i].etunimi,this.testiHenkilot[i].sukunimi,this.testiHenkilot[i].katuosoite,this.testiHenkilot[i].postinumero,this.testiHenkilot[i].postitoimipaikka,this.testiHenkilot[i].puhelin,this.testiHenkilot[i].email]);  
        await this.db.executeSql("INSERT INTO ilmoitukset(henkiloId, kuva, otsikko, teksti, alue, osasto, laji, toiminto, paivays) VALUES (?,?,?,?,?,?,?,?,?);",[(i+1),this.testiIlmoitukset[i].kuva,this.testiIlmoitukset[i].otsikko,this.testiIlmoitukset[i].teksti,this.testiIlmoitukset[i].alue,this.testiIlmoitukset[i].osasto,this.testiIlmoitukset[i].laji,this.testiIlmoitukset[i].toiminto,this.testiIlmoitukset[i].paivays]);
      }

      //virheiden pyydystys
      }catch (error){
        this.virhe=error;
      }

    });

  } 

  //ilmoitusten haku
  haeIlmoitukset = async (laji:string,osasto:string,toiminto:string,alue:string) : Promise<any> =>{
    let sql:string="";            //kysely
    let hakusanat:string[]=[];    //hakusanojen taulukko
    
    //SQL-kyselyn muodostaminen 
    if (laji!=""){                //laji on valittu
      sql="laji=?";
      hakusanat.push(laji);
    }
    if (osasto!=""){              //osasto on valittu
      if (sql==""){               //on eka hakuehto
        sql="osasto=?";
      } else {                    //on seuraava hakuehto
        sql=sql+" AND osasto=?";
      }
      hakusanat.push(osasto);
    }
    if (toiminto!=""){
      if (sql==""){               //on eka hakuehto
        sql="toiminto=?";
      } else {                    //on seuraava hakuehto
        sql=sql+" AND toiminto=?";
      }
      hakusanat.push(toiminto);
    }
    if (alue!=""){
      if (sql==""){               //on eka hakuehto
        sql="alue=?";
      } else {                    //on seuraava hakuehto
        sql=sql+" AND alue=?";
      }
      hakusanat.push(alue);
    }

    if (sql==""){                 //ei yhtään hakuehtoa
      sql="SELECT * FROM ilmoitukset;";
    } else {                      //liitetään hakuehdot
      sql="SELECT * FROM ilmoitukset WHERE "+sql+";";
    }
    this.testi=sql;

    let hakutulos = await this.db.executeSql(sql,hakusanat);  //hakukyselyn suoritus

    //ilmoituksen tekijän tiedoille
    let ilmoittaja: Henkilo = {
      id: null,
      tunnus: "",
      etunimi: "",
      sukunimi: "",
      katuosoite: "",
      postinumero: "",
      postitoimipaikka: "",
      puhelin: "",
      email: ""
    };

    //ilmoituslistan tyhjäys
    this.ilmoituslista=[];

    //ilmoitusten läpikäynti
    for (let i=0;i<hakutulos.rows.length;i++){                            
        let henkiloId = hakutulos.rows.item(i).henkiloId;                 //ilmoittajan id       
        
        //haetaan ilmoittajan tiedot ilmoitukseen
        let ilmoittajahaku = await this.db.executeSql("SELECT * FROM henkilot WHERE id=?;",[henkiloId]);
        ilmoittaja = ilmoittajahaku.rows.item(0);

        //lisätään ilmoitus ilmoituslistaan
        this.ilmoituslista.push({
                id: hakutulos.rows.item(i).id,
                henkiloId: hakutulos.rows.item(i).henkiloId,
                ilmoittaja: ilmoittaja,
                kuva: hakutulos.rows.item(i).kuva,
                otsikko: hakutulos.rows.item(i).otsikko,
                teksti: hakutulos.rows.item(i).teksti,
                alue: hakutulos.rows.item(i).alue,
                osasto: hakutulos.rows.item(i).osasto,
                laji: hakutulos.rows.item(i).laji,
                toiminto: hakutulos.rows.item(i).toiminto,
                paivays: hakutulos.rows.item(i).paivays                      
        });
    }   
    this.kpl=this.ilmoituslista.length;
  } 

  //ilmoittajan omien ilmoitusten haku
  haeOmatIlmoitukset  = async (henkiloId: number) : Promise<any> =>{

    let hakutulos = await this.db.executeSql("SELECT * FROM ilmoitukset WHERE henkiloId=?;",[henkiloId]);  //hakua vastaavat ilmoitukset tietokannasta

    this.ilmoituslista=[];

    for (let i=0;i<hakutulos.rows.length;i++){                            //ilmoitusten läpikäynti     
        //lisätään ilmoitus ilmoituslistaan
        this.ilmoituslista.push({
                id: hakutulos.rows.item(i).id,
                ilmoittaja: this.kayttaja,
                henkiloId: hakutulos.rows.item(i).henkiloId,
                kuva: hakutulos.rows.item(i).kuva,
                otsikko: hakutulos.rows.item(i).otsikko,
                teksti: hakutulos.rows.item(i).teksti,
                alue: hakutulos.rows.item(i).alue,
                osasto: hakutulos.rows.item(i).osasto,
                laji: hakutulos.rows.item(i).laji,
                toiminto: hakutulos.rows.item(i).toiminto,
                paivays: hakutulos.rows.item(i).paivays                      
        });
    }   
    this.kpl=this.ilmoituslista.length;
  } 

  //ilmoittajan tietojen haku
  haeIlmoittaja = async (tunnus:string):Promise<any>=>{
    let kayttajahaku= await this.db.executeSql("SELECT * FROM henkilot WHERE tunnus=?;",[tunnus]);
    this.kayttaja=kayttajahaku.rows.item(0);
  }

  //uuden henkilön tallennus tietokantaan
  lisaaHenkilo = async (henkilo:Henkilo):Promise<any>=>{
    await this.db.executeSql("INSERT INTO henkilot(tunnus,etunimi,sukunimi,katuosoite,postinumero,postitoimipaikka,puhelin,email) VALUES (?,?,?,?,?,?,?,?);",[henkilo.tunnus,henkilo.etunimi,henkilo.sukunimi,henkilo.katuosoite,henkilo.postinumero,henkilo.postitoimipaikka,henkilo.puhelin,henkilo.email]);  
    let uusiIdHaku= await this.db.executeSql("SELECT id FROM henkilot WHERE tunnus=?;",[henkilo.tunnus]);
    henkilo.id=uusiIdHaku.rows.item(0).id;
    this.kayttaja=henkilo;
  }

  //henkilön muokkaus 
  muokkaaHenkilo = async (henkilo: Henkilo):Promise<any>=>{
    await this.db.executeSql("UPDATE henkilot SET etunimi=?,sukunimi=?,katuosoite=?,postinumero=?,postitoimipaikka=?,puhelin=?,email=?) WHERE id=?;",[henkilo.etunimi,henkilo.sukunimi,henkilo.katuosoite,henkilo.postinumero,henkilo.postitoimipaikka,henkilo.puhelin,henkilo.email,henkilo.id]);  
  }

  //uuden ilmoituksen tallennus tietokantaan
  lisaaIlmoitus = async (ilmoitus:Ilmoitus,ilmoittajaId:number):Promise<any>=>{
    try{
      await this.db.executeSql("INSERT INTO ilmoitukset(henkiloId, kuva, otsikko, teksti, alue, osasto, laji, toiminto, paivays) VALUES (?,?,?,?,?,?,?,?,?);",[ilmoittajaId,ilmoitus.kuva,ilmoitus.otsikko,ilmoitus.teksti,ilmoitus.alue,ilmoitus.osasto,ilmoitus.laji,ilmoitus.toiminto,ilmoitus.paivays]);
    }catch(error) {
      this.virhe=error;
    }
  }
  
}

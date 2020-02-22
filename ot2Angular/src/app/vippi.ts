/*
    file: vippi.ts
    desc: OT2, vippikirjanpito
            - vipin oma tietotyyppimääritys
    date: 30.1.2019
    auth: Maarit Parkkonen
*/
export interface Vippi {
    id : number;            //tunnistin
    nimi : string;          //velallinen tai velkoja
    summa : number;         //määrä
}

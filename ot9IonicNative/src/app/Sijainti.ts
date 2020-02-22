//@Maarit Parkkonen, 2019

//paikan tietotyyppi (hieman huono nimi..)
export interface Sijainti {
    id: number;
    lat: number;
    lon: number;
    pvm: Date;
    otsikko: string;
    teksti: string;
    kuvat?: string[];            //kuvat base64 muodossa
}
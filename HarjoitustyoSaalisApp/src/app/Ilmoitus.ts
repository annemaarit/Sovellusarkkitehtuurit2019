//@Maarit Parkkonen, 2019
import { Henkilo } from './Henkilo';

//ilmoituksen tietotyyppi
export interface Ilmoitus {
    id?: number;
    henkiloId?: number;
    ilmoittaja?: Henkilo;
    kuva?: string;
    otsikko: string;
    teksti: string;
    alue: string;
    osasto: string;          //marjat, sienet, kalat, riista
    laji: string;
    toiminto: string;       //myy, ostaa, antaa, vastaanottaa
    paivays: string;
    poistopvm?: string;
}
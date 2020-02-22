//@Maarit Parkkonen, 2019

import { Henkilo } from './Henkilo';
import { Mokki } from './Mokki';

//varauksen tietotyyppi
export interface Varaus {
    mokki: Mokki;
    alkuPvm: any;
    paivatKpl: number;
    siivous: boolean;
    summa: number;
    varaaja: Henkilo;
}
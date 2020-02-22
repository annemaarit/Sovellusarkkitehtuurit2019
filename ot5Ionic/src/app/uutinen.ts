//@Maarit Parkkonen, 2019

//yksittäisen uutisen tietotyyppi
export interface Uutinen {
    otsikko: string;
    sisalto: string;
    linkki: string;
    kuva: string;
    pvm: string;
    aikaleima: number;
    ika?: string;           //miten vanha uutinen on
    uusi?:boolean;          //näytetäänkö ensimmäisen kerran
}
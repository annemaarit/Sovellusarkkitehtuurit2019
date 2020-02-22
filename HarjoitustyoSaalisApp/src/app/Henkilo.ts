//käyttäjän tai ilmoittajan tiedot
export interface Henkilo {
    id?: number;
    tunnus?: string;
    etunimi: string;
    sukunimi? : string;
    katuosoite?: string;
    postinumero?: string;
    postitoimipaikka?: string;
    puhelin?: string;
    email?: string;
}
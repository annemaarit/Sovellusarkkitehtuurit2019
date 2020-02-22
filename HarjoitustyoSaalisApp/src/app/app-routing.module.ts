import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'haku', loadChildren: './haku/haku.module#HakuPageModule' },
  { path: 'uusi', loadChildren: './uusi/uusi.module#UusiPageModule' },
  { path: 'ilmoitukset', loadChildren: './ilmoitukset/ilmoitukset.module#IlmoituksetPageModule' },
  { path: 'lajit', loadChildren: './lajit/lajit.module#LajitPageModule' },
  { path: 'tekstit', loadChildren: './tekstit/tekstit.module#TekstitPageModule' },
  { path: 'yhteystiedot', loadChildren: './yhteystiedot/yhteystiedot.module#YhteystiedotPageModule' },
  { path: 'henkilo', loadChildren: './henkilo/henkilo.module#HenkiloPageModule' },
  { path: 'esikatselu', loadChildren: './esikatselu/esikatselu.module#EsikatseluPageModule' },
  { path: 'omat', loadChildren: './omat/omat.module#OmatPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

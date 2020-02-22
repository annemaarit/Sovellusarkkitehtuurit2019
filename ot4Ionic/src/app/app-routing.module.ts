import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'henkilo', loadChildren: './henkilo/henkilo.module#HenkiloPageModule' },
  { path: 'kooste', loadChildren: './kooste/kooste.module#KoostePageModule' },
  { path: 'kiitos', loadChildren: './kiitos/kiitos.module#KiitosPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

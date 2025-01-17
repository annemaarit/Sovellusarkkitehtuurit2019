import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IlmoituksetPage } from './ilmoitukset.page';

const routes: Routes = [
  {
    path: '',
    component: IlmoituksetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IlmoituksetPage]
})
export class IlmoituksetPageModule {}

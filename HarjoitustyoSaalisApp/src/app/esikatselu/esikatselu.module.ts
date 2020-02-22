import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EsikatseluPage } from './esikatselu.page';

const routes: Routes = [
  {
    path: '',
    component: EsikatseluPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsikatseluPage]
})
export class EsikatseluPageModule {}

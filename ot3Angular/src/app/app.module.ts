//@Maarit Parkkonen, 2019

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ValuuttalomakeComponent } from './valuuttalomake/valuuttalomake.component';
import { TuloksetComponent } from './tulokset/tulokset.component';

//reititys
const reitit : Routes = [
  {
    path : "lomake",
    component : ValuuttalomakeComponent
  },
  {
    path : "",
    component : ValuuttalomakeComponent
  },
  {
    path : "tulos",
    component : TuloksetComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ValuuttalomakeComponent,
    TuloksetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(reitit)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

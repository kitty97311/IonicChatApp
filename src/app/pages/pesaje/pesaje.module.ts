import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesajePageRoutingModule } from './pesaje-routing.module';

import { PesajePage } from './pesaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesajePageRoutingModule
  ],
  declarations: [PesajePage]
})
export class PesajePageModule {}

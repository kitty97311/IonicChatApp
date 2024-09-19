import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesajeDetallePageRoutingModule } from './pesaje-detalle-routing.module';

import { PesajeDetallePage } from './pesaje-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesajeDetallePageRoutingModule
  ],
  declarations: [PesajeDetallePage]
})
export class PesajeDetallePageModule {}

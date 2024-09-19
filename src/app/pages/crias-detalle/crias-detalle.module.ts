import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriasDetallePageRoutingModule } from './crias-detalle-routing.module';

import { CriasDetallePage } from './crias-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriasDetallePageRoutingModule
  ],
  declarations: [CriasDetallePage]
})
export class CriasDetallePageModule {}

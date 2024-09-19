import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesajeDetallePage } from './pesaje-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PesajeDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesajeDetallePageRoutingModule {}

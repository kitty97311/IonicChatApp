import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriasDetallePage } from './crias-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CriasDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriasDetallePageRoutingModule {}

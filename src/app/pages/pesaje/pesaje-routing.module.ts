import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesajePage } from './pesaje.page';

const routes: Routes = [
  {
    path: '',
    component: PesajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesajePageRoutingModule {}

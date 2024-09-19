import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriasPage } from './crias.page';

const routes: Routes = [
  {
    path: '',
    component: CriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriasPageRoutingModule {}

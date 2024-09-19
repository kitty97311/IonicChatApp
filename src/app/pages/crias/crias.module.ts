import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriasPageRoutingModule } from './crias-routing.module';

import { CriasPage } from './crias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriasPageRoutingModule
  ],
  declarations: [CriasPage]
})
export class CriasPageModule {}

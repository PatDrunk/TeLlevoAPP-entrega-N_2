import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionPageRoutingModule } from './opcion-routing.module';

import { OpcionPage } from './opcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionPageRoutingModule
  ],
  declarations: [OpcionPage]
})
export class OpcionPageModule {}

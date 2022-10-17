import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionPage } from './opcion.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionPageRoutingModule {}

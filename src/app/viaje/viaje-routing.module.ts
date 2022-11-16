import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajePage } from './viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ViajePage
  },
  {
    path: 'detalleviaje',
    loadChildren: () => import('./detalleviaje/detalleviaje.module').then( m => m.DetalleviajePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajePageRoutingModule {}

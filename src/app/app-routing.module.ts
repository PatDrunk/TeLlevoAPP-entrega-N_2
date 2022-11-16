import {  NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'conductor',
    children:[
      {
        path: '',
        loadChildren: () => import('./conductor/conductor.module').then( m => m.ConductorPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./conductor/detalle/detalle.module').then( m => m.DetallePageModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pasajero',
    loadChildren: () => import('./pasajero/pasajero.module').then( m => m.PasajeroPageModule)
  },
  {
    path: 'opcion',
    loadChildren: () => import('./opcion/opcion.module').then( m => m.OpcionPageModule)
  },

  {
    path: 'mapa', component: MapaComponent
  },
  {
    path: 'viaje',

    children: [
      {
        path: '',
        loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./viaje/detalleviaje/detalleviaje.module').then( m => m.DetalleviajePageModule)
      }
    ]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

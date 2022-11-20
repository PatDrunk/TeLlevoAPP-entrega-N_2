import { Viaje } from '../interface/viaje';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {


  constructor() { }

  /*obtenerViajes(){
    return [...this.viaje]
  }

  obtenerViaje(usuario: string){
    return{
      ...this.viaje.find(aux => {
        return aux.nombre_usuario === usuario
      })
    }
  }

  agregarViaje(id: string, nombre_usuario: string,desde: string,hasta: string,hora_viaje: string, valor: string){
    this.viaje.push({
      id,nombre_usuario,hasta,hora_viaje,valor
    })

  }
  */
}

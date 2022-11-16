import { Viaje } from '../interface/viaje';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  public viaje : Viaje [] = [
    {
      id: '1',
      nombre_usuario : 'Pedro',
      desde: 'DuocUC',
      hasta: 'Buin',
      hora_viaje : '08:10',
      valor: '$100'
    }
  ]

  constructor() { }

  obtenerViajes(){
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
      id,nombre_usuario,desde,hasta,hora_viaje,valor
    })

  }
}

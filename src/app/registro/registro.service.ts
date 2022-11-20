import { Usuario } from './../interface/usuarios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  /*private usuario: Usuario [] = [
    {
      id : '1',
      usuario : 'pedro',
      password : 'asd',
      activo : 'si',
      pasajeros : '2'
    },
    {
      
      id : '2',
      usuario : 'juan',
      password : 'asd',
      activo : 'no',
      pasajeros : '0'
    }
  ]

  constructor() { }

  obtenerUsuarios(){
    return[...this.usuario]
  }

  obtenerUsuario(user: string, pass:string){
    return{
      ...this.usuario.find(aux => {
        return aux.usuario === user && aux.password === pass
      })
    }
  }

  /*agregarUsuario(usuario: string, password: string, activo: string, pasajeros: string){
    this.usuario.push({
      usuario,password,activo,pasajeros, id: this.usuario.length + 1 + ""
    })
  }

  eliminarUsuario( id: string){
    this.usuario = this.usuario.filter(aux => {
      return aux.id !== id
    })

  }*/
}

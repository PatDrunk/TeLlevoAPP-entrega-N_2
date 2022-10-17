import { Usuario } from './../interface/usuarios';
import { FirebaseService } from './../services/firebase.service';
import { RegistroService } from './../registro/registro.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios = []

  constructor(private servicio: RegistroService, private fire: FirebaseService ) {}

  ngOnInit() {
    //this.usuarios = this.servicio.obtenerUsuarios()
    this.obtenerUsuarios();
  }

  ionViewWillEnter() {
    //this.usuarios = this.servicio.obtenerUsuarios()
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.fire.getCollection<Usuario>('usuarios').subscribe(
      (res) => {
        this.usuarios = res;
        console.log(res)
      },
      (err) => {

      }
    )
  }

}

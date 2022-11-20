import { Usuario } from './../interface/usuarios';
import { FirebaseService } from './../services/firebase.service';
import { RegistroService } from './registro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuarios : Usuario = {
    id : '',
    usuario : '',
    password : '',
    activo : '',
    pasajeros : '',
    email: ''
  }

  constructor(private servicio: RegistroService, private router: Router, private fire: FirebaseService,) { }

  ngOnInit() {
  }
  
  /*guardar(txtUsuario,txtPassword,txtPasajeros,txtEmail){
    const usu : Usuario = {
      id : '',
      usuario : txtUsuario.value,
      password : txtPassword.value,
      activo : this.selectedValue,
      pasajeros : txtPasajeros.value
  }
    this.fire.cargarLoading("Guardando Usuario....")

    this.fire.createDoc(usu,'usuarios',usu.id).then(
      (res) => {
        const user = this.fire.registro(txtEmail.value, txtPassword.value);
        if (user){}
        this.fire.cerrarLoading()
        this.fire.mensaje("Usuario Generado Exitosamente!")
      }
    )
  }*/

  async guardar(){
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password,
    }
    const res = await this.fire.registro(credenciales.email,credenciales.password)
    const uid = await this.fire.getUid();
    this.usuarios.id = uid;
    this.guardarUser();
    console.log(uid)
  }

  async guardarUser(){
    const path = 'usuarios';
    const name = this.usuarios.usuario;
    this.fire.createDoc(this.usuarios,path,this.usuarios.id)
  }
}

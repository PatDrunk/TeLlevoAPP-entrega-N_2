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

  usuarios = []
  selectedValue: any;

  constructor(private servicio: RegistroService, private router: Router, private fire: FirebaseService) { }

  ngOnInit() {
  }

  guardar(txtUsuario,txtPassword,txtPasajeros,txtEmail){
    const usu : Usuario = {
      id : this.fire.getId(),
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
  }
}

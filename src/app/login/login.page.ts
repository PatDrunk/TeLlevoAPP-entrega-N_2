import { FirebaseService } from './../services/firebase.service';
import { Router } from '@angular/router';
import { Usuario } from './../interface/usuarios';
import { RegistroService } from './../registro/registro.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuario
  constructor(private fire: FirebaseService, private servicio: RegistroService, private router: Router) { }

  ngOnInit() {
  }
  
  /*login(txtUser,txtPass){
    this.usuario = this.servicio.obtenerUsuario(txtUser.value,txtPass.value)
    if (this.usuario.usuario === txtUser.value && this.usuario.usuario === txtPass.value) {
      this.router.navigate(['/opcion'])
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Credenciales incorrectas!',
        heightAuto: false
      })
      
    }
    
  }*/

  async login(txtEmail, txtPass){
    const user = await(this.fire.login(txtEmail.value,txtPass.value))
    if (user) {
      Swal.fire({
        icon: 'success',
        text: 'Inicio session exitosamente!',
        heightAuto: false
      })
      this.router.navigate(['/opcion'])
    }
    Swal.fire({
      icon: 'error',
      text: 'Credenciales incorrectas!',
      heightAuto: false
    })
  }

  logingmail(){
    this.fire.loginGoogle()
    this.router.navigate(['/opcion'])
  }

  logingit(){
    this.fire.loginGit()
    this.router.navigate(['/opcion'])
  }
}

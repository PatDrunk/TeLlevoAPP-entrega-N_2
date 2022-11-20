import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from './../interface/usuarios';
import { Viaje } from './../interface/viaje';
import { FirebaseService } from './../services/firebase.service';
import { ViajeService } from '../viaje/viaje.service';
import { RegistroService } from './../registro/registro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  usuarios = []
  viajes = []
  fireuser: any;

  constructor(private router: Router , private fire: FirebaseService,private servicio: RegistroService, private servicio2: ViajeService) { }

  ngOnInit() {
    this.validacion()
  }

  ionViewWillEnter() {
    this.validacion()
  }
  
  obtenerViajes(){
    this.fire.getCollection<Viaje>('viaje').subscribe(
      (res) => {
        this.viajes = res;
        console.log(res)
      },
      (err) => {
      }
    )
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

  validacion(){
    this.fire.obtenerUsuario().then(
      (resp) => {
        if (resp.emailVerified){
          this.obtenerUsuarios();
          this.obtenerViajes();
          this.fireuser = resp;
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          text: 'Email no verificado!',
          heightAuto: false
        })
        this.router.navigate(['/login'])
      }
    )
  }

  async cerrarSesion(){
    this.fire.logout()
    this.router.navigate(['/home'])
  }

}

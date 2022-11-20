import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from './../services/firebase.service';
import { Viaje } from './../interface/viaje';
import { RegistroService } from './../registro/registro.service';
import { ViajeService } from '../viaje/viaje.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

 viaje : Viaje = {
  id : '',
  id_user: '',
  nombre_usuario: '',
  hasta: '',
  hora_viaje : '',
  distancia: '',
  valor: '500'
 }

  presentingElement = null;

  constructor(private db: AngularFirestore, private fire: FirebaseService ,private activatedRoute: ActivatedRoute , private servicio: ViajeService, private servicio2: RegistroService ,private router: Router) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.action-button');
  }

  /*viajeIniciado(txtActual,txtDestino){
    this.servicio.agregarViaje(this.viaje.length+1+'','pedro',txtActual.value,txtDestino.value,this.hora)
    Swal.fire({
      icon: 'success',
      title: 'Hemos comenzado nuestro Viaje!',
      heightAuto: false
    })
  }*/


  /*viajeIniciado(txtDestino){
    this.fire.obtenerUsuario().then(
      (resp) => {
        if (resp.emailVerified){
          const via : Viaje = {
            id: this.fire.getId(),
            id_user: this.fire.getId,
            hasta: txtDestino.value,
            hora_viaje: this.hora,
            nombre_usuario: 'pedro',
            valor: '$100'
          }
          this.fire.cargarLoading("Guardando viaje, espere....")
          this.fire.createDoc(via,'viaje',via.id).then(
            (res) =>{
              this.fire.cerrarLoading()
              this.fire.mensaje("¡Viaje generado exitosamente!")
            }
          )
        }
        else{
          Swal.fire({
            icon: 'error',
            text: '¡Debe validar su correo antes de iniciar un viaje!',
            heightAuto: false
          })
          this.router.navigate(['/home'])
        }
      }
    )
  }*/

  viajeCancelado(){
    Swal.fire({
      icon: 'error',
      text: 'El viaje ha sido cancelado!',
      heightAuto: false
    })
  }

  async viajeIniciado(){
    const id = this.fire.getId();
    this.viaje.id = id;
    this.guardarViaje();
    this.updateViaje();
  }

  async updateViaje(){
    const uid = await this.fire.getUid();
    this.db.doc(`viaje/${this.viaje.id}`).update({id_user:uid});
  }

  async guardarViaje(){
    const path = 'viaje';
    const name = this.viaje.nombre_usuario;
    this.fire.createDoc(this.viaje,path,this.viaje.id)
  }

  async cerrarSesion(){
    this.fire.logout()
    this.router.navigate(['/home'])
  }

}

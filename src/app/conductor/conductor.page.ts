import { FirebaseService } from './../services/firebase.service';
import { Viaje } from './../interface/viaje';
import { RegistroService } from './../registro/registro.service';
import { ViajeService } from './../viaje.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  viaje: []
  hora: any;

  constructor(private fire: FirebaseService ,private activatedRoute: ActivatedRoute , private servicio: ViajeService, private servicio2: RegistroService ,private router: Router) { }

  ngOnInit() {

  }

  /*viajeIniciado(txtActual,txtDestino){
    this.servicio.agregarViaje(this.viaje.length+1+'','pedro',txtActual.value,txtDestino.value,this.hora)
    Swal.fire({
      icon: 'success',
      title: 'Hemos comenzado nuestro Viaje!',
      heightAuto: false
    })
  }*/


  viajeIniciado(txtActual,txtDestino){
    this.fire.obtenerUsuario().then(
      (resp) => {
        if (resp.emailVerified){
          const via : Viaje = {
            id: this.fire.getId(),
            desde: txtActual.value,
            hasta: txtDestino.value,
            hora_viaje: this.hora,
            nombre_usuario: 'pedro',
            valor: '$100'
          }
          this.fire.cargarLoading("Guardando Viaje....")
          this.fire.createDoc(via,'viaje',via.id).then(
            (res) =>{
              this.fire.cerrarLoading()
              this.fire.mensaje("Viaje Generado Exitosamente!")
            }
          )
        }
        else{
          Swal.fire({
            icon: 'error',
            text: 'Debe validar su correo antes de iniciar un viaje!',
            heightAuto: false
          })
          this.router.navigate(['/home'])
        }
      }
    )
  }

  viajeCancelado(){
    Swal.fire({
      icon: 'error',
      text: 'El Viaje a sido Cancelado!',
      heightAuto: false
    })
  }

  async cerrarSesion(){
    this.fire.logout()
    this.router.navigate(['/home'])
  }

}

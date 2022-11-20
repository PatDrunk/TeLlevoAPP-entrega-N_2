import { Pasajero } from './../../interface/pasajero';
import { Viaje } from './../../interface/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  id = ''
  viaje = []
  viaje_pasajero = []
  pasajero : Pasajero = {
    id : '',
    id_viaje : '',
    nombre : '',
    recojida : ''
  }

constructor(private fire: FirebaseService,private ActivatedRoute: ActivatedRoute, private alerta: AlertController, private router: Router
  ,private db: AngularFirestore) {
    this.ActivatedRoute.paramMap.subscribe(data => {
      this.id = data.get('id')
      console.log('viaje id:',this.id)
    })
   }

  ngOnInit() {
    this.id
    this.obtenerViajes()
    this.obtenerPasajeros()

  }

  ionViewWillEnter() {
    this.id
    this.obtenerViajes()
    this.obtenerPasajeros()
    
  }

  obtenerViajes(){
    this.fire.getCollection<Viaje>('viaje').subscribe(
      (res) => {
        this.viaje = res;
        console.log(res)
      },
      (err) => {
      }
    )
  }

  obtenerPasajeros(){
    this.fire.getCollection<Pasajero>('pasajero').subscribe(
      (res) => {
        this.viaje_pasajero = res;
      },
      (err) => {
      }
    )
  }

  agregarPasajero(){
    const id = this.fire.getId();
    this.pasajero.id = id;
    this.guardarPasajero();
  }

  guardarPasajero(){
    this.fire.createDoc(this.pasajero,'pasajero',this.pasajero.id)
    this.db.doc(`pasajero/${this.pasajero.id}`).update({
    id_viaje:this.id,
    nombre: 'Pedro',
    recojida: 'Santiago'});
  }
}

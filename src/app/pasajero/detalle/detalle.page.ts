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

constructor(private fire: FirebaseService,private ActivatedRoute: ActivatedRoute, private alerta: AlertController, private router: Router
  ,private db: AngularFirestore) {
    this.ActivatedRoute.paramMap.subscribe(data => {
      this.id = data.get('id')
      console.log('viaje id:',this.id)
    })
   }

  ngOnInit() {
    this.obtenerViajes()
    this.id
    console.log(this.obtenerViajes())
    console.log(this.id)
  }

  ionViewWillEnter() {
    this.obtenerViajes()
    this.id
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
}

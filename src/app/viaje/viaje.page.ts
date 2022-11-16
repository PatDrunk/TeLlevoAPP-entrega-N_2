import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ViajeService } from './viaje.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  viajes = []

  constructor(private servicio: ViajeService, private router: Router, private alerta: AlertController) { }

  ngOnInit() {
    this.viajes = this.servicio.obtenerViajes()
  }

  ionViewWillEnter() {
    this.viajes = this.servicio.obtenerViajes()
  }

}

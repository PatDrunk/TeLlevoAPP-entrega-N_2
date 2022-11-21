import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Pasajero } from './../../interface/pasajero';
import { Viaje } from './../../interface/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {

    // https://www.npmjs.com/package/angularx-qrcode
  qrCodeString = 'Se Registro en el viaje';
  scannedResult: any;

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

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      if(result?.hasContent) {
        this.agregarPasajero();
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  }

  ngOnDestroy(): void {
      this.stopScan();
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

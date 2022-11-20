import { Usuario } from './../interface/usuarios';
import { FirebaseService } from './../services/firebase.service';
import { RegistroService } from './../registro/registro.service';
import { Component,OnDestroy,OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  usuarios = []

  qrCodeString = 'Hola';
  scannedResult: any;

  constructor(private servicio: RegistroService, private fire: FirebaseService ) {}

  async checkPermission  ()  {
    try{
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    }catch(e){
      console.log(e);
    }
  }

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  }

  async starScan(){
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if(result?.hasContent){
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan()
    }
  }

  ngOnInit() {
    //this.usuarios = this.servicio.obtenerUsuarios()
    this.obtenerUsuarios();
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  ionViewWillEnter() {
    //this.usuarios = this.servicio.obtenerUsuarios()
    this.obtenerUsuarios();
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

}

import { FirebaseService } from './../services/firebase.service';
import { RegistroService } from './../registro/registro.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios = []

  datocodificado: any;
  datoscaneado: {};

  qrCodeString = 'Hola';
  scannedResult: any;

  constructor(private servicio: RegistroService, private fire: FirebaseService ) {}

  /*LeerCode(){
    this.BarcodeScanner.scan().then(barcodeData => {
      this.datoscaneado = barcodeData;
    })
    .catch(err => {
      console.log('Error', err);
    });
  }

  CodificarTexto(){
    this.BarcodeScanner.encode(this.BarcodeScanner.Encode.TEXT_TYPE, this.datocodificado).then(
      encodedData => {
        this.datocodificado = encodedData;
      },
      err => {
        console.log('Un errror ha ocurrido:' + err);
      }
    );
  }
  */

  /*async checkPermission  ()  {
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
  }*/

  ngOnInit() {
  }

  /*ngOnDestroy(): void {
    this.stopScan();
  }*/

  ionViewWillEnter() {
  }

}

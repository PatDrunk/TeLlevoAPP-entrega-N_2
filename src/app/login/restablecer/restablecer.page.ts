import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    Swal.fire({
      icon: 'success',
      title: 'Contraseña cambiada!',
      heightAuto: false
    })
  }

}

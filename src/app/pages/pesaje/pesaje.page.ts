import { Component, OnInit } from '@angular/core';
import { PesajeService } from 'src/app/services/pesaje.service';

@Component({
  selector: 'app-pesaje',
  templateUrl: './pesaje.page.html',
  styleUrls: ['./pesaje.page.scss'],
})
export class PesajePage implements OnInit {

  public pesajes: string[];
  public currentDate:string;


  constructor(
    private pesajeService: PesajeService
  ) { 

    const date = new Date();
    this.currentDate = date.toISOString();

    this.read();
  }

  read(){
    // Leemos los datos de la base de datos
    this.pesajeService.readPesajes().then( (pesajes: string[]) => {
      this.pesajes = pesajes;
      console.log("Leido");
      console.log(this.pesajes);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

  ngOnInit() {
  }

}

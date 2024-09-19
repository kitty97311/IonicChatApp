import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriasService } from 'src/app/services/crias.service';
import { PesajeService } from 'src/app/services/pesaje.service';

@Component({
  selector: 'app-pesaje-detalle',
  templateUrl: './pesaje-detalle.page.html',
  styleUrls: ['./pesaje-detalle.page.scss'],
})
export class PesajeDetallePage implements OnInit {

  @ViewChild('inputPeso') swiper: ElementRef;


  public id: string;
  public pesajes : any;
  public detalles : any;

  public peso: string;
  public currentDate:string;

  constructor(
    private route: ActivatedRoute,
    private pesajeService: PesajeService
  ) { }

  ngOnInit() {
    const date = new Date();
    this.currentDate = date.toISOString();

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.read();
    this.readDetalles();
    this.swiper.nativeElement.focus();

  }

  read(){
    // Leemos los datos de la base de datos
    this.pesajeService.readPesaje(this.id).then( (pesajes: string[]) => {
      this.pesajes = pesajes;
      console.log("Leido pesajes ");
      console.log(this.pesajes);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }


  readDetalles(){
    // Leemos los datos de la base de datos
    this.pesajeService.readPesajesDetalle(this.id).then( (detalles: string[]) => {
      this.detalles = detalles;
      console.log("Leido pesajes detalles");
      console.log(this.detalles);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

  create(){
    // Creamos un elemento en la base de datos
    this.pesajeService.createPesajeDetalle(this.id, this.peso, this.currentDate).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.peso = '';
      this.readDetalles(); // Volvemos a leer
      this.swiper.nativeElement.focus();
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  createInput(){
    // Creamos un elemento en la base de datos
    this.pesajeService.createPesajeDetalle(this.id, this.peso, this.currentDate).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.peso = '';
      this.readDetalles(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  delete(id: string){
    // Borramos el elemento
    this.pesajeService.deletePesajesDetalle(id).then( (changes) => {
      console.log(changes);
      console.log("Borrado");
      this.readDetalles(); // Volvemos a leer
      this.swiper.nativeElement.focus();
    }).catch(err => {
      console.error(err);
      console.error("Error al borrar");
    })
  }

}

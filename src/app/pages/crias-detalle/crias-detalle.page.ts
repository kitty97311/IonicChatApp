import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriasService } from 'src/app/services/crias.service';

@Component({
  selector: 'app-crias-detalle',
  templateUrl: './crias-detalle.page.html',
  styleUrls: ['./crias-detalle.page.scss'],
})
export class CriasDetallePage implements OnInit {

  id: string;
  crias : any;
  detalles : any;

  public consumo: string;
  public mortalidad: string;
  public fecha: string;
  public formattedDate: string;

  public currentDate:string;


  constructor(
    private route: ActivatedRoute,
    private criasService: CriasService,
  ) { }

  ngOnInit() {
    const date = new Date();
    this.currentDate = date.toISOString();

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.read();
    this.readDetalles();
  }

  read(){
    // Leemos los datos de la base de datos
    this.criasService.readCria(this.id).then( (crias: string[]) => {
      this.crias = crias;
      console.log("Leido crias ");
      console.log(this.crias);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }


  readDetalles(){
    // Leemos los datos de la base de datos
    this.criasService.readCriasDetalle(this.id).then( (detalles: string[]) => {
      this.detalles = detalles;
      console.log("Leido crias detalles");
      console.log(this.detalles);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

  create(){
    // Creamos un elemento en la base de datos
    this.criasService.createCriasDetalle(this.id, this.consumo, this.mortalidad, this.currentDate).then( (changes) =>{
      console.log(changes);
      console.log("Creado");
      this.consumo = '';
      this.mortalidad = '';
      this.readDetalles(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
  }

  delete(id: string){
    // Borramos el elemento
    this.criasService.deleteCriasDetalle(id).then( (changes) => {
      console.log(changes);
      console.log("Borrado");
      this.readDetalles(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al borrar");
    })
  }

}

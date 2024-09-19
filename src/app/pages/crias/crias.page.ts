import { Component, OnInit } from '@angular/core';
import { CriasService } from 'src/app/services/crias.service';

@Component({
  selector: 'app-crias',
  templateUrl: './crias.page.html',
  styleUrls: ['./crias.page.scss'],
})
export class CriasPage implements OnInit {

  public consumo: string;
  public mortalidad: string;
  public fecha: string;
  public formattedDate: string;

  public crias: string[];

  public currentDate:string;

  constructor(
    private criasService: CriasService,
  ) { 

    const date = new Date();
    this.currentDate = date.toISOString();

    this.consumo='';
    this.mortalidad='';
    this.fecha='';
    this.crias=[];
  }

  ionViewWillEnter(){
    this.read();
    
  }

  read(){
    // Leemos los datos de la base de datos
    this.criasService.readCrias().then( (crias: string[]) => {
      this.crias = crias;
      console.log("Leido");
      console.log(this.crias);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

  ngOnInit() {
  }

 

}

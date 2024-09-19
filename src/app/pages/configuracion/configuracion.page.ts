import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';
import { ApiService } from '../../services/api.service';
import { UsersService } from 'src/app/services/users.service';
import { CriasService } from 'src/app/services/crias.service';
import { PesajeService } from 'src/app/services/pesaje.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  public data: any;

  public load : boolean;
  public message : string;
  public error : string;
  public crias : any;
  public pesaje : any;
  public usersMessage: string;
  public ip: string;

  constructor(
    private sqlite: SqliteService,
    private usersService: UsersService,
    private criasService: CriasService,
    private pesajeService: PesajeService,
    private loginService: LoginService,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router
  ) { 

    this.load = false;
    this.crias = [];
    this.message = '';
    this.usersMessage = '';
    this.error = '';
    this.ip = '192.168.0.2';
    this.readIp();

  }

  ngOnInit() {
  }

  


  async presentAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: message,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

    importar(){

      this.load = true;

      this.apiService.getData().subscribe((response) => {
        this.data = response;
        console.log(this.data);

        this.deleteAllUsers();

        this.load = false;
        this.message = 'Data cargada satisfactoriamente';
      },
      (error) => {
        this.error = this.error + error.message+' status: '+error.status+' statustext: '+error.statustext+ 'url: '+error.url;

        this.presentAlert('Error al conectar verificar IP '+error.message);
        this.error = this.error + error;
      });

    }

    usuarios(){

      this.load = true;

      this.apiService.getUsuarios().subscribe((response) => {
        this.data = response;
        console.log(this.data);

        this.deleteAllUsers();

        this.load = false;
        this.message = 'Data cargada satisfactoriamente';
      },
      (error) => {
        console.log(error);
        this.error = this.error + error.message+' status: '+error.status+' statustext: '+error.statustext+ 'url: '+error.url;
        this.presentAlert('Error al conectar verificar IP '+error.message);
      });

    }

    readIp(){
      // Leemos los datos de la base de datos
      this.sqlite.readIp().then( (ip: string) => {
        if(ip){
          this.ip = ip;
        }else{
          this.ip = 'http://192.168.0.2';
          this.sqlite.createIp(this.ip);
        }
        localStorage.setItem('ip', this.ip);
        console.log(this.ip);
      }).catch(err => {
        console.error(err);
        this.error = this.error + err;
        console.error("Error al leer");
      })
    }

    updateIp(){

      console.log("kitty__________________________________________:" + this.ip);
      this.sqlite.updateIp(this.ip).then( (changes) =>{
        this.usersMessage = 'Se ha creado actualizado la ip  ';
        this.presentAlert(this.usersMessage);
        localStorage.setItem('ip', this.ip);
      }).catch(err => {
        console.error(err);
        this.error = this.error + err;
        console.error("Error al crear");
        this.error='Error al crear usuarios';
        this.presentAlert('Error al conectar verificar IP');
      })
  
    }

    saveUsers(){

          this.usersService.createUsers(this.data.data.usuarios).then( (changes) =>{
            console.log("Creado");
            this.usersMessage = 'Se ha creado '+this.data.data.usuarios.length+' Usuarios ';
            this.presentAlert(this.usersMessage);
          }).catch(err => {
            console.error(err);
            console.error("Error al crear");
            this.error='Error al crear usuarios';
            this.presentAlert('Error al conectar verificar IP');
          })
      
    }

    deleteAllUsers(){
      // Borramos el elemento
      this.usersService.deleteAllUsers().then( (changes) => {
        console.log(changes);
        console.log("Borrado");

        this.saveUsers();

      }).catch(err => {
        console.error(err);
        console.error("Error al borrar");
        this.presentAlert('Error al conectar verificar IP');
      })
    }


    getCrias(){

      this.load = true;

      this.apiService.getCrias().subscribe((response) => {
        this.data = response;
        console.log(this.data);

        this.deleteAllCrias();

        this.load = false;
        this.message = 'Data cargada satisfactoriamente';
      },
      (error) => {
        this.error = this.error + error.message+' status: '+error.status+' statustext: '+error.statustext+ 'url: '+error.url;

        console.log(error);
        this.error = this.error + error;
        this.presentAlert('Error al conectar verificar IP '+error.message);
      });

    }

    saveCrias(){

          this.criasService.createCrias(this.data.data.crias).then( (changes) =>{
            console.log("Creado");
            this.usersMessage = 'Se ha creado '+this.data.data.crias.length+' Formularios para crias ';
            this.presentAlert(this.usersMessage);
          }).catch(err => {
            console.error(err);
            console.error("Error al crear");
            this.presentAlert('Error al conectar verificar IP');
          })
      
    }

    deleteAllCrias(){
      this.criasService.deleteAllCrias().then( (changes) => {
        console.log(changes);
        console.log("Borrado");

        this.saveCrias();

      }).catch(err => {
        console.error(err);
        console.error("Error al borrar");
        this.presentAlert('Error al conectar verificar IP');
      })
    }


    enviarCrias(){

      // Leemos los datos de la base de datos
      this.criasService.readCriasDetalleAll().then( (crias: string[]) => {
        this.crias = crias;
        console.log("Leido");
        console.log(this.crias);

        this.apiService.postCria(this.crias).subscribe((response:any)=>{
          console.log(response);
        });

      }).catch(err => {
        console.error(err);
        console.error("Error al leer");
        this.presentAlert('Error al conectar verificar IP');
      })
    }


    enviarPesaje(){

      // Leemos los datos de la base de datos
      this.pesajeService.readPesajesDetalleAll().then( (pesaje: string[]) => {
        this.pesaje = pesaje;
        console.log("Leido");
        console.log(this.crias);

        this.apiService.postPesaje(this.pesaje).subscribe((response:any)=>{
          console.log(response);
        });

      }).catch(err => {


        console.error(err);
        console.error("Error al leer");
        this.presentAlert('Error al conectar verificar IP');
      })
    }


    getPesajes(){

      this.load = true;
  
      this.apiService.getPesajes().subscribe((response) => {
        this.data = response;
        console.log(this.data);
  
        this.deleteAllPesajes();
  
        this.load = false;
        this.message = 'Data cargada satisfactoriamente';
      },
      (error) => {
        this.error = this.error + error.message+' status: '+error.status+' statustext: '+error.statustext+ 'url: '+error.url;

        this.error = this.error + error;
        this.presentAlert('Error al conectar verificar IP '+error.message);
      });
  
    }

    deleteAllPesajes(){
      this.pesajeService.deleteAllPesajes().then( (changes) => {
        console.log(changes);
        console.log("Borrado");
  
        this.savePesajes();
  
      }).catch(err => {
        console.error(err);
        console.error("Error al borrar");
        this.presentAlert('Error al conectar verificar IP');
      })
    }

    savePesajes(){

      this.pesajeService.createPesajes(this.data.data.pesaje).then( (changes) =>{
        console.log("Creado");
        this.usersMessage = 'Se ha creado '+this.data.data.pesaje.length+' Formularios para pesaje ';
        this.presentAlert(this.usersMessage);
      }).catch(err => {
        console.error(err);
        console.error("Error al crear");
        this.presentAlert('Error al conectar verificar IP');
      })
  
    }

    logout(){

      this.loginService.logout();

      if(!this.loginService.isAuthenticated()){
        this.router.navigate(['/login']);
      }
  
    }

}

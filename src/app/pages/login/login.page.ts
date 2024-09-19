import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email : string;
  public password : string;
  public users : any;
  public data : any;
  isAlertOpen = false;
  alertButtons = ['Cerrar'];

  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private router: Router
  ) {

    this.password='';
    this.email = null;
    this.read();

   }

  ngOnInit() {
    if(this.loginService.isAuthenticated()){
      this.router.navigate(['/configuracion']);
    }

  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  login(){
    // Leemos los datos de la base de datos
    this.loginService.login(this.email, this.password).then( (users: string[]) => {
      this.users = users;

      if(this.loginService.isAuthenticated()){
        this.router.navigate(['/configuracion']);
      }

      this.setOpen(true);

    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }


  read(){
    // Leemos los datos de la base de datos
    this.usersService.readUsers().then( (users: string[]) => {
      this.users = users;
      if(!this.users.length){
        this.usersService.createUserAdmin();
      }
      console.log("Leido");
      console.log(this.users);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

}

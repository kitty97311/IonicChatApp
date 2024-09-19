import { Component, OnInit } from '@angular/core';
import { SqliteService } from 'src/app/services/sqlite.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public users : any[];

  constructor(
    private usersService:UsersService,
  ) { 
    this.read();
  }

  ngOnInit() {
  }

  read(){
    // Leemos los datos de la base de datos
    this.usersService.readUsers().then( (users: string[]) => {
      this.users = users;
      console.log("Leido");
      console.log(this.users);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }

}

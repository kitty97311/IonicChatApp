import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { SqliteService } from './sqlite.service';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private sqlite: SqliteService,
    private http: HttpClient,
  ) { }

  async login(email:string, password:string) {

    let sql = 'SELECT * FROM usuarios where email = ? and password = ? limit 1 ';
   
    const dbName = await this.sqlite.getDbName();

    const pass = Md5.hashStr(password);
  
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [email, pass] // necesario para android
    }).then(async (response: capSQLiteValues) => {
      let users: string[] = [];

   
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      
      for (const element of response.values) {
        const user = element;
        users.push(user);
      }

      if(users.length>0){
        localStorage.setItem('user', JSON.stringify(users[0]))
      }

      return users;

    }).catch(err => Promise.reject(err))
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return localStorage.getItem('user')!=null ? true: false;
  }


}

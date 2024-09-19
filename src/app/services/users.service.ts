import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private sqlite: SqliteService
  ) { }

  async createUsers(data:any) {
    let sql = 'INSERT INTO usuarios (name, email, password) VALUES';

    let values = [];

    let i =0;

    for (const element of data) {

      if(i==0){
        sql=sql+' (?, ?, ?)'
      }else{
        sql=sql+', (?, ?, ?)'
      }

      values.push(element.name);
      values.push(element.email);
      values.push(element.pass);

      i++;
    }

   // let sql = 'INSERT INTO usuarios (name, email, password) VALUES(?, ?, ?)';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: values
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  async createUserAdmin() {
    // Sentencia para insertar un registro
    let sql = 'INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            'admin','admin@gmail.com','8ce87b8ec346ff4c80635f667d1592ae'
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      console.log(changes);

      return changes;
    }).catch(err => Promise.reject(err))
  }

  async readUsers() {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM usuarios';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let users: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const user = element;
        users.push(user);
      }
      return users;

    }).catch(err => Promise.reject(err))
  }

  async deleteAllUsers() {
    // Sentencia para eliminar un registro
    let sql = 'DELETE FROM usuarios WHERE 1=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            1
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  

}

import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class PesajeService {

  constructor(
    private sqlite: SqliteService
  ) { }

  async createPesajes(data:any) {

    let sql = 'INSERT INTO pesaje (pesaje_id, lote, codigo_material, codigo_centro, codigo_almacen, fecha) VALUES';

    let values = [];

    let i =0;

    for (const element of data) {

      if(i==0){
        sql=sql+' (?,?, ?, ?, ?, ?)'
      }else{
        sql=sql+', (?,?, ?, ?, ?, ?)'
      }

      values.push(element.id);
      values.push(element.lote);
      values.push(element.codigo_material);
      values.push(element.codigo_centro);
      values.push(element.codigo_almacen);
      values.push(element.fecha);
      i++;
    }

    const dbName = await this.sqlite.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: values
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  async readPesajes() {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM pesaje';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let items: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const item = element;
        items.push(item);
      }
      return items;

    }).catch(err => Promise.reject(err))
  }

  async readPesaje(id:string) {
    let sql = 'SELECT * FROM pesaje where pesaje_id=?';
    const dbName = await this.sqlite.getDbName();
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [id] // necesario para android
    }).then((response: capSQLiteValues) => {
      let items: string[] = [];
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      for (const element of response.values) {
        const item = element;
        items.push(item);
      }
      return items;

    }).catch(err => Promise.reject(err))
  }

  async deleteAllPesajes() {
    let sql = 'DELETE FROM pesaje WHERE 1=?';
    const dbName = await this.sqlite.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            '1'
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

  async createPesajeDetalle(pesaje_id:string, peso: string, fecha: string) {
    // Sentencia para insertar un registro
    let sql = 'INSERT INTO pesaje_detalle (pesaje_id, peso, fecha) VALUES(?, ?, ?)';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            pesaje_id,
            peso,
            fecha
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

  async readPesajesDetalle(pesaje_id:string) {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM pesaje_detalle where pesaje_id=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [pesaje_id] // necesario para android
    }).then((response: capSQLiteValues) => {
      let items: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const item = element;
        items.push(item);
      }
      return items;

    }).catch(err => Promise.reject(err))
  }

  async readPesajesDetalleAll( ) {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM pesaje_detalle';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let items: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const item = element;
        items.push(item);
      }
      return items;

    }).catch(err => Promise.reject(err))
  }


  async deletePesajesDetalle(id: string) {
    // Sentencia para eliminar un registro
    let sql = 'DELETE FROM pesaje_detalle WHERE id=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            id
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

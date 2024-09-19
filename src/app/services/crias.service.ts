import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class CriasService {

  constructor(
    private sqlite: SqliteService
  ) { }

  async createCrias(data:any) {

    let sql = 'INSERT INTO crias (cria_id, lote, codigo_material, codigo_centro, codigo_almacen, fecha_nacimiento, fecha_llegada, cantidad_inicial, m_galpon, m_aves) VALUES';

    let values = [];

    let i =0;

    for (const element of data) {

      if(i==0){
        sql=sql+' (?,?, ?, ?, ?, ?, ?, ?, ?, ?)'
      }else{
        sql=sql+', (?,?, ?, ?, ?, ?, ?, ?, ?, ?)'
      }

      values.push(element.id);
      values.push(element.lote);
      values.push(element.codigo_material);
      values.push(element.codigo_centro);
      values.push(element.codigo_almacen);
      values.push(element.fecha_nacimiento);
      values.push(element.fecha_llegada);
      values.push(element.cantidad_inicial);
      values.push(element.m_galpon);
      values.push(element.m_aves);

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

  async readCrias() {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM crias';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let crias: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const cria = element;
        crias.push(cria);
      }
      return crias;

    }).catch(err => Promise.reject(err))
  }

  async readCria(id:string) {
    let sql = 'SELECT * FROM crias where cria_id=?';
    const dbName = await this.sqlite.getDbName();
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [id] // necesario para android
    }).then((response: capSQLiteValues) => {
      let crias: string[] = [];
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      for (const element of response.values) {
        const cria = element;
        crias.push(cria);
      }
      return crias;

    }).catch(err => Promise.reject(err))
  }

  async deleteAllCrias() {
    let sql = 'DELETE FROM crias WHERE 1=?';
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

  async createCriasDetalle(cria_id:string, consumo: string,mortalidad: string, fecha: string) {
    // Sentencia para insertar un registro
    let sql = 'INSERT INTO crias_detalle (cria_id, consumo, mortalidad, fecha) VALUES(?, ?, ?, ?)';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            cria_id,
            consumo,
            mortalidad,
            fecha,
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

  async readCriasDetalle(cria_id:string) {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM crias_detalle where cria_id=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [cria_id] // necesario para android
    }).then((response: capSQLiteValues) => {
      let crias: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const cria = element;
        crias.push(cria);
      }
      return crias;

    }).catch(err => Promise.reject(err))
  }

  async readCriasDetalleAll( ) {
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM crias_detalle';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let crias: string[] = [];

      // Si es IOS y hay datos, elimino la primera fila
      // Esto se debe a que la primera fila es informacion de las tablas
      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (const element of response.values) {
        const cria = element;
        crias.push(cria);
      }
      return crias;

    }).catch(err => Promise.reject(err))
  }

  async updateCriasDetalle(id: string, consumo: string, mortalidad: string, fecha: string, ) {
    // Sentencia para actualizar un registro
    let sql = 'UPDATE languages SET consumo=?, mortalidad = ?, fecha=? WHERE id=?';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            consumo,
            mortalidad,
            fecha,
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

  async deleteCriasDetalle(id: string) {
    // Sentencia para eliminar un registro
    let sql = 'DELETE FROM crias_detalle WHERE id=?';
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

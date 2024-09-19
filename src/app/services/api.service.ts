import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://localhost:8001/api"
  public ip = '';

  constructor(
    private http:HttpClient,
  ) { 

    this.ip = localStorage.getItem('ip');
    this.apiUrl =  this.ip+"/api"
  }

  getIp(){
    this.ip = localStorage.getItem('ip');
    console.log(this.ip);
    this.apiUrl =  this.ip+"/api"
  }

  getData() {
    this.getIp();
    return  this.http.get(`${this.apiUrl}`);
  }

  getUsuarios() {
    this.getIp();
    return  this.http.get(`${this.apiUrl}/usuarios`);
  }

  getPesajes() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/pesaje`);
  }

  getCrias() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/crias`);
  }

  getAlmacen() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/almacen`);
  }

  getCentro() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/centro`);
  }

  getEmpresa() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/empresa`);
  }

  getMaterial() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/material`);
  }

  getLotaje() {
    this.getIp();

    return  this.http.get(`${this.apiUrl}/lotaje`);
  }

  postCria(c:any){
    this.getIp();

    return this.http.post<any>(`${this.apiUrl}`, c);
  }

  postPesaje(c:any){
    this.getIp();

    let urlPesaje = this.apiUrl+'/pesaje'
    return this.http.post<any>(`${urlPesaje}`, c);
  }



}

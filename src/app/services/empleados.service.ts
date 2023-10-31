import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/Empleado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private API_URI: string |undefined;

  constructor(private http: HttpClient) { 
    this.API_URI = environment.url;
  }

  getEmpleados(){
    return this.http.get(`${this.API_URI}/empleados`);
  }

  getEmpleado(id: string){
    return this.http.get(`${this.API_URI}/empleado?id=${id}`);
  }

  createEmpleado(empleado: Empleado){
    return this.http.post(`${this.API_URI}/empleado`, empleado);
  }

  updateEmpleado(id: string, empleado: Empleado){
    return this.http.put(`${this.API_URI}/empleado?id=${id}`, empleado);
  }

  deleteEmpleado(id: string){
    return this.http.delete(`${this.API_URI}/empleado?id=${id}`);
  }


}

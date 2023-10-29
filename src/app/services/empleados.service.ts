import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  API_URI = 'https://71nd3xtkqg.execute-api.us-east-1.amazonaws.com/prod';

  constructor(private http: HttpClient) { }

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

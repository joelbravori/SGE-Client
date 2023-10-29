import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmpleadoResponse } from 'src/app/models/EmpleadoResponse';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  json = {
    "Operation": "GET USERS",
    "Message": "SUCCESS",
    "Response": [
      {
        "correo": "slorcadelgado@gmail.com",
        "nombre": "seba lorca",
        "ImageKey": "b4a3c18c-09ab-4a6d-ae5e-392cdec957d5.jpg",
        "ImageUrl": "https://proyectoclsan13sf.s3.amazonaws.com/b4a3c18c-09ab-4a6d-ae5e-392cdec957d5.jpg",
        "telefono": "958592695",
        "id": "17370134-9",
        "direccion": "Arica, Chile"
      },
      {
        "correo": "slorcadelgado@gmail.com",
        "nombre": "seba lorca",
        "ImageKey": "b4a3c18c-09ab-4a6d-ae5e-392cdec957d5.jpg",
        "ImageUrl": "https://proyectoclsan13sf.s3.amazonaws.com/b4a3c18c-09ab-4a6d-ae5e-392cdec957d5.jpg",
        "telefono": "958592695",
        "id": "17370134-9",
        "direccion": "Arica, Chile"
      },
      {
        "correo": "slorcadelgado@gmail.com",
        "nombre": "seba lorca",
        "ImageKey": "b4a3c18c-09ab-4a6d-ae5e-392cdec957d5.jpg",
        "ImageUrl": "https://proyectoclsan13sf.s3.amazonaws.com/b4a3c18c-09ab-4a6d-ae5e-392cdec957d5.jpg",
        "telefono": "958592695",
        "id": "17370134-9",
        "direccion": "Arica, Chile"
      }
    ]
  }

  empleados: EmpleadoResponse[] = [];

  constructor(private empleadoService: EmpleadosService) { }

  ngOnInit() {

    // this.empleadoService.getEmpleados().pipe(
    //   tap((res:any) => {
    //     console.log(res);
    //     this.empleados = res.Response;
    //   }),
    //   catchError(err => {
    //     console.error(err);
    //     return throwError(() => err)
    //   })
    // ).subscribe();
    this.empleados=this.json.Response;

  }

}

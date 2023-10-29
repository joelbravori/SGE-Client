import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmpleadoResponse } from 'src/app/models/EmpleadoResponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: EmpleadoResponse[] = [];

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().pipe(
      tap((res:any) => {
        console.log(res);
        this.empleados = res.Response;
      }),
      catchError(err => {
        console.error(err);
        return throwError(() => err)
      })
    ).subscribe();
    //this.empleados=this.json.Response;
  }

  eliminarEmpleado(id: string){
    console.log(id)

    this.empleadoService.deleteEmpleado(id).pipe(
      tap((res:any) => {
        console.log(res);
        this.getEmpleados();
      }),
      catchError(err => {
        console.error(err);
        return throwError(() => err)
      })
    ).subscribe();
  }

  toCreateUser(){
    this.router.navigate(['/empleado/crear']);
  }

}

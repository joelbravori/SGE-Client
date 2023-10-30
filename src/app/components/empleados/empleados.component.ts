import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmpleadoResponse } from 'src/app/models/EmpleadoResponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: EmpleadoResponse[] = [];

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados(){

    this.empleadoService.getEmpleados().pipe(
      tap((res:any) => {
        //console.log(res);
        this.empleados = res.Response;
        if(res.Message!=='SUCCESS'){
          this.toastr.error(res.Reason);
        }
      }),
      catchError(err => {
        console.error(err);
        return throwError(() => err)
      })
    ).subscribe();
    
  }

  eliminarEmpleado(id: string){
    console.log(id)

    this.empleadoService.deleteEmpleado(id).pipe(
      tap((res:any) => {
        if(res.Message==='SUCCESS'){
          console.log(res);
          this.toastr.success('Se eliminó el empleado exitosamente.');
          this.getEmpleados();
        }
      }),
      catchError(err => {
        console.error(err);
        this.toastr.error(err.error.Reason);
        this.getEmpleados();
        return throwError(() => err)
      })
    ).subscribe();
  }

  toCreateUser(){
    this.router.navigate(['/empleado/crear']);
  }

}

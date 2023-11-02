import { SpinnerService } from './../../services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmpleadoResponse } from 'src/app/models/EmpleadoResponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  idEliminar:string='';
  empleados: EmpleadoResponse[] = [];

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router,
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados(){

    this.empleadoService.getEmpleados().pipe(
      tap((res:any) => {
        this.empleados = res.Response;
        if(res.Message!=='SUCCESS'){
          this.toastr.error(res.Reason);
        }
      }),
      catchError(err => {
        return throwError(() => err)
      })
    ).subscribe();
    
  }

  eliminarEmpleado(){

    if(this.idEliminar!==''){

      this.empleadoService.deleteEmpleado(this.idEliminar).pipe(
        tap((res:any) => {
          if(res.Message==='SUCCESS'){
            this.toastr.success('Se eliminó el empleado exitosamente.');
            this.limpiarEliminar();
            this.getEmpleados();
          }
        }),
        catchError(err => {
          this.toastr.error(err.error.Reason);
          this.limpiarEliminar();
          this.getEmpleados();
          return throwError(() => err)
        })
      ).subscribe();

    }
    
  }

  toCreateUser(){
    this.router.navigate(['/empleado/crear']);
  }

  formatearRut(rut:string){
    return formatRut(rut, RutFormat.DOTS_DASH)
  }

  setEliminar(id: string){
    this.idEliminar=id;
  }

  limpiarEliminar(){
    this.idEliminar='';
  }

}

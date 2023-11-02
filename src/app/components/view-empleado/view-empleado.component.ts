import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-empleado',
  templateUrl: './view-empleado.component.html',
  styleUrls: ['./view-empleado.component.css']
})
export class ViewEmpleadoComponent implements OnInit {

  empleadoForm!:FormGroup;
  
  myImage!:Observable<any>;

  constructor(
    private empleadoService: EmpleadosService,
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.empleadoForm = this.initForm();
    this.getData();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      correo: [''],
      telefono: [''],
      direccion: [''],
      imagen: [''],
      imagen2: [''],
      id: ['']
    })
  }

  getData(){
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.empleadoService.getEmpleado(params['id']).pipe(
        tap((res:any) => {
          if(res.Message==='SUCCESS'){
            this.empleadoForm.patchValue({
              nombre: res.Response.nombre,
              correo: res.Response.correo,
              telefono: res.Response.telefono,
              direccion: res.Response.direccion,
              id: res.Response.id, RutFormat
            });
            this.myImage=res.Response.ImageUrl;
          }
          
        }),
        catchError(err => {
          this.toastr.error(err.error.Reason);
          return throwError(() => err)
        })
      ).subscribe();
    }
  }

}

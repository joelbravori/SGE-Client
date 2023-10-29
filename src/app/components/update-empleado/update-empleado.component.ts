import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, tap, catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/Empleado';
@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  empleado: Empleado={
    id: '',
    imagen: '',
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  }
  
  constructor(
    private empleadoService: EmpleadosService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(){
    this.getData();
  }

  getData(){
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.empleadoService.getEmpleado(params['id']).pipe(
        tap((res:any) => {
          console.log(res);
          //this.router.navigate(['/empleados']);
        }),
        catchError(err => {
          console.error(err);
          return throwError(() => err)
        })
      ).subscribe();
    }
  }

}

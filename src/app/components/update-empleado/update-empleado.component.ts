import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, tap, catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/Empleado';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RutValidator } from '../../valida-rut.directive';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {
  
  empleadoForm!:FormGroup;
  myImage!:Observable<any>;

  constructor(
    private empleadoService: EmpleadosService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.empleadoForm = this.initForm();
    this.getData();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(13)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      imagen: [''],
      imagen2: [''],
      id: ['', [Validators.required, RutValidator()]]
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
              id: formatRut(res.Response.id, RutFormat.DOTS_DASH)
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

  updateUser(){
    const params = this.activatedRoute.snapshot.params;
    if(params['id']){
      this.empleadoForm.patchValue({id: this.formatearRut(this.empleadoForm.get('id')?.value)});
      this.empleadoService.updateEmpleado(params['id'],this.empleadoForm.value).pipe(
      tap((res:any) => {
        //console.log(res);
        if(res.Message==='SUCCESS'){
          this.toastr.success('Empleado editado exitosamente.');
        }
        else{
          this.toastr.error(res.Reason);
        }
        this.router.navigate(['/empleados']);
      }),
      catchError(err => {
        console.log('entró acá')
        console.error(err);
        this.toastr.error(err.error.Reason);
        this.router.navigate(['/empleados']);
        return throwError(() => err)
      })
    ).subscribe();
    }
    
  }

  formatearRut(rut:string){
    return formatRut(rut);
  }

  onChange($event: Event){
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    //console.log(file)
    this.convertToBase64(file);
  }

  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      this.myImage=d;
      this.empleadoForm.patchValue({imagen: d});
    })
  }

  readFile(file: File, subscriber: Subscriber<any>){

    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);

      subscriber.complete();
    }

    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }

  }

  cancelar(){
    this.router.navigate(['/empleados']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, tap, catchError, throwError } from 'rxjs';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { RutValidator } from '../../valida-rut.directive';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  empleadoForm!:FormGroup;
  myImage!:Observable<any>;

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.empleadoForm = this.initForm();
  }


  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(13)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      imagen: [''],
      imagen2: ['', [Validators.required]],
      id: ['', [Validators.required, RutValidator()]]
    })
  }
  
  createUser(){
    
    this.empleadoService.createEmpleado(this.empleadoForm.value).pipe(
      tap((res:any) => {
        
        if(res.Message==='SUCCESS'){
          this.toastr.success('Empleado guardado exitosamente.');
          this.router.navigate(['/empleados']);
        }
        else{
          this.toastr.error(res.Reason);
        }
        
      }),
      catchError(err => {
        this.toastr.error(err.error.Reason);
        return throwError(() => err)
      })
    ).subscribe();

  }

  formatearRut(rut:string){
    return formatRut(rut, RutFormat.DOTS_DASH).toUpperCase();
  }

  onChange($event: Event){
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    this.convertToBase64(file);
  }

  onChangeRut(event: any){
    let valorInput = event.target.value;
    if(validateRut(valorInput)){
      this.empleadoForm.patchValue({id: this.formatearRut(this.empleadoForm.get('id')?.value)});
    }

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

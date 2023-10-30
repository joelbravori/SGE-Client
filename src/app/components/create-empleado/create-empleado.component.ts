import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, tap, catchError, throwError } from 'rxjs';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatRut } from '@fdograph/rut-utilities';
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
  base64code!: string;

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
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(11)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      imagen: [''],
      imagen2: ['', [Validators.required]],
      id: ['', [Validators.required, RutValidator()]]
      
    })
  }
  
  createUser(){
    
    this.empleadoForm.patchValue({id: this.formatearRut(this.empleadoForm.get('id')?.value)});
    this.empleadoService.createEmpleado(this.empleadoForm.value).pipe(
      tap((res:any) => {
        //console.log(res);
        if(res.Message==='SUCCESS'){
          this.toastr.success('Empleado guardado exitosamente.');
        }
        else{
          this.toastr.error(res.Reason);
        }
        this.router.navigate(['/empleados']);
      }),
      catchError(err => {
        //console.error(err);
        this.toastr.error(err.error.Reason);
        return throwError(() => err)
      })
    ).subscribe();
    
    //console.log(this.empleadoForm.value)

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
      this.base64code= d;
      this.myImage=d;
      //this.empleado.imagen = d;
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

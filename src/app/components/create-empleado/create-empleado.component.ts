import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';
@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  empleado: Empleado={
    id: '',
    imagen: '',
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  }

  myImage!:Observable<any>;
  base64code!: string;

  constructor(){}

  ngOnInit(){}

  createUser(){
    console.log(this.empleado)
  }

  onChange($event: Event){
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    console.log(file)
    this.convertToBase64(file);
  }

  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      this.base64code= d;
      this.myImage=d;
      this.empleado.imagen = d;
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
}

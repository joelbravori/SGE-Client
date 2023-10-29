import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { UpdateEmpleadoComponent } from './components/update-empleado/update-empleado.component';
import { ViewEmpleadoComponent } from './components/view-empleado/view-empleado.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'empleado/crear',
    component: CreateEmpleadoComponent
  },
  {
    path: 'empleado/editar/:id',
    component: UpdateEmpleadoComponent
  },
  {
    path: 'empleado/detalles/:id',
    component: ViewEmpleadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

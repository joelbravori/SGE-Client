import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpleadosService } from './services/empleados.service';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { UpdateEmpleadoComponent } from './components/update-empleado/update-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EmpleadosComponent,
    InicioComponent,
    CreateEmpleadoComponent,
    UpdateEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmpleadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

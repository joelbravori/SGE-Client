import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpleadoComponent } from './view-empleado.component';

describe('ViewEmpleadoComponent', () => {
  let component: ViewEmpleadoComponent;
  let fixture: ComponentFixture<ViewEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmpleadoComponent]
    });
    fixture = TestBed.createComponent(ViewEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

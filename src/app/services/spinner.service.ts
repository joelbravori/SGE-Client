import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private spinnerService: NgxSpinnerService
  ) { }

  public activateSpinner(){
    this.spinnerService.show();
  }

  public deactivateSpinner(){
    this.spinnerService.hide();
  }
}

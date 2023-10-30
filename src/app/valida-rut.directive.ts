import {AbstractControl, ValidatorFn} from '@angular/forms';
import { validateRut } from '@fdograph/rut-utilities';

export function RutValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {

        return validateRut(control.value) ? null : {'invalidRut': true}
        
    }
}

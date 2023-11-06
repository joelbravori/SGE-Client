import {AbstractControl, ValidatorFn} from '@angular/forms';

export function ImageValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {

        console.log('control->', control)

        const file = control.value;
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        return validImageTypes.includes(fileType) ? null : {'invalidImage': true}
        
    }
}

import {AbstractControl, ValidatorFn} from '@angular/forms';

export function ImageValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {

        console.log('control->', control)

        let file = control.value;
        const regex = new RegExp("(.*?)\.(jpg|png|jpeg|gif)$"); //add or remove required extensions here
        let regexTest = regex.test(file);
        
        return regexTest ? null : {'invalidImage': true}
        
    }
}

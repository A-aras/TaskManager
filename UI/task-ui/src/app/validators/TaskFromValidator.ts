import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms'
import { FormArray, FormControl } from '@angular/forms';

// export interface  FormValidationErrors
// {
//     ControlName:string;
//     ErrorName:string;
//     ErrorValue:any;
// }

// export interface FormGroupControls
// {
//     [key:string]:AbstractControl;
// }

// export function GetAllFormsErrors(controls:FormGroupControls):FormValidationErrors[]
// {
// let errors:FormValidationErrors[]=[];
// Object.keys(controls).forEach(key=>{
//     let control=controls[key];
//     if(control instanceof FormGroup )
//     {
//         errors=errors.concat(GetAllFormsErrors(control.controls))
//     }

//     if( control instanceof FormArray)
//     {
//         errors=errors.concat(GetAllFormsErrors(control.))
//     }
// });
// return errors;

// }

export class TaskFromValidator {
    static Validate(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(field => {
            var control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.Validate(control);
            }
            else if (control instanceof FormArray) {
                this.Validate(control);
            }
        });
    }
}
// export function ValidateAllFormFields(formGroup: FormGroup | FormArray) {
//     Object.keys(formGroup).forEach(field => {
//         var control = formGroup.get(field);
//         if (control instanceof FormControl) {
//             control.markAsTouched({ onlySelf: true });
//         }
//         else if (control instanceof FormGroup) {
//             ValidateAllFormFields(control);
//         }
//         else if (control instanceof FormArray) {
//             ValidateAllFormFields(control);
//         }
//     });
// }
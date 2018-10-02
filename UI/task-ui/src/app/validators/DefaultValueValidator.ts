import { FormControl } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";
import { Validators } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export function  DefaultValueValidator(defaultValue: string|null): ValidatorFn{
    return (control: AbstractControl): { [s: string]: boolean } | null => {
        return control.value === defaultValue ? { "DefaultValueValidator": true } : null;
    };
}


// export function DateMustbeGreaterThanValidation(startDateFormControlname: string, endDateFormControlname: string): ValidatorFn {
//     return (control: AbstractControl): { [s: string]: boolean } | null => {

//         const invalidOj = { "DateRange": true };
//         const startDateFormControl = control.get(startDateFormControlname);
//         const endDateFormControl = control.get(endDateFormControlname);
//         if (startDateFormControl.valid && endDateFormControl.valid) {
//             const stardDate = Date.parse(startDateFormControl.value);
//             const endDate = Date.parse(endDateFormControl.value);
//             if (stardDate > endDate) {
//                 return invalidOj;
//             }
//             return null;
//         }
//         return null;

//     };
// }



// export function  DefaultValueValidator(defaultValue:string,control: AbstractControl):{[s:string]:boolean}|null
// {
//              return control.value==defaultValue?{"NotValid":false}:null;
// }

// export class DefaultValueValidatior extends Validators{
//     Validate(control: AbstractControl):{[s:string]:boolean}

//     {
//         if(control.value==null ||control.value==0)
//         {
//             return {"Validate":false};
//         }
// return null;
//     }


// }
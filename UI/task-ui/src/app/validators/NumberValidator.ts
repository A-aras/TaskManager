import { FormControl } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";
import { Validators } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export function  NumberMustbeGreaterThanValidation(startValueControlName: string, endValueControlName: string): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {

        const invalidOj = { "NumberMustbeGreaterThanValidation": true };
        const startValueControl = control.get(startValueControlName);
        const endValueControl = control.get(endValueControlName);
        if (startValueControl.valid && endValueControl.valid) {
            const startValue = Number.parseInt(startValueControl.value);
            const endValue = Number.parseInt(endValueControl.value);
            if (endValue >= startValue) {
                return invalidOj;
            }
            return null;
        }
        return null;

    };
}

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl):{ [key: string]: any } | null => {
        const password = formGroup.get('password');
        const rePass = formGroup.get('rePass');
    
        if (password && rePass && password.value !== rePass.value) {
          rePass.setErrors({ passwordsNotMatch: true });
        }
        return null;
      };
}
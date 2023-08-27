import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

function passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl):{ [key: string]: any } | null => {
        const password = formGroup.get('password');
        const rePass = formGroup.get('rePass');
    
        if (password && rePass && password.value !== rePass.value) {
          rePass.setErrors({ passwordsNotMatch: true });
        }
        return null;
      };
}

function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.trim())) {
        return { invalidEmail: true };
      }
      return null;
    };
  }

  function noSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim().length <3) {
        return { containsSpace: true };
      }
      return null;
    };
  }

  export function customValidators(){
    return {
       passwordsMatch: passwordsMatchValidator,
       email: emailValidator,
       noSpaceValidator: noSpaceValidator,
    }
  }

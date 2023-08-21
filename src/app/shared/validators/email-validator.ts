import { AbstractControl, ValidatorFn } from '@angular/forms';


export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}
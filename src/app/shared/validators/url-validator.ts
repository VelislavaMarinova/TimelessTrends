import { AbstractControl, ValidatorFn } from '@angular/forms';

export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && !/^https?:\/\//i.test(value)) {
      return { invalidImageUrl: true };
    }
    return null;
  };
}
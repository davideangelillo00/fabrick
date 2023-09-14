import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !!control.value && !emailRegex.test(control.value) ? { emailValidation: true } : null;
}

export function fullNameValidator(control: AbstractControl): ValidationErrors | null {
  return !!control.value && control.value.split(' ')?.filter(Boolean)?.length < 2 ? { fullNameValidation: true } : null;
}

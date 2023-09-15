import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserGenderEnum } from 'src/app/shared/enums/user.enum';
import { Select } from 'src/app/shared/interfaces/select';
import { ValidationErrorsEnum } from '../enums/validator-errors.enum';

/**
 * Validator for the email field format
 * @param control The email AbstractControl
 * @returns ValidationErrors instance if the format isn't correct, null otherwise
 */
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return Boolean(control.value) && !emailRegex.test(control.value) ? { [ValidationErrorsEnum.EMAIL]: true } : null;
}

/**
 * Validator for the user full name. There must be both the first name and the last name, and they both must be
 * made of 2 characters or longer
 * @param control
 * @returns ValidationErrors instance if the format isn't correct, null otherwise
 */
export function fullNameValidator(control: AbstractControl): ValidationErrors | null {
  const fullNameRegex = /^\w{2,}\b.*\b\w{2,}\b/
  return Boolean(control.value) && !fullNameRegex.test(control.value) ? { [ValidationErrorsEnum.FULL_NAME]: true } : null;
}

export function getGenders(): Select[] {
  return [
    {text: 'Male', value: UserGenderEnum.MALE},
    {text: 'Female', value: UserGenderEnum.FEMALE},
  ];
}

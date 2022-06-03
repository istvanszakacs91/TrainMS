import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const sameValuesValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const owner = control.get('owner');
  const site = control.get('site');

  return owner && site && owner.value === site.value ? { 'sameValue': true } : null;
};
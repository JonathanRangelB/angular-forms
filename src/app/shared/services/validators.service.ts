import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    let value = control.value as string;
    let valueLower = value.toLowerCase().trim();

    if (valueLower === 'strider') {
      return { noStrider: true };
    }
    return null;
  };

  isValidField(form: FormGroup, field: string) {
    if (!form.get(field)) return;
    return form.get(field)?.touched && form.get(field)?.errors;
  }

  isFieldOneEqualFieldTwo(field: string, fieldCompare: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password1 = formGroup.get(field)?.value;
      const password2 = formGroup.get(fieldCompare)?.value;

      if (password1 !== password2) {
        formGroup.get(fieldCompare)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.get(fieldCompare)?.setErrors(null);

      return null;
    };
  }
}

import { FormControl, ValidationErrors } from '@angular/forms';

export const cantBeStrider = (
  control: FormControl
): ValidationErrors | null => {
  let value = control.value as string;
  let valueLower = value.toLowerCase().trim();

  if (valueLower === 'strider') {
    return { noStrider: true };
  }
  return null;
};

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

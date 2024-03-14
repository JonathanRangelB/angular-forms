import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import * as custonValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private emailValidatorService = inject(EmailValidatorService);

  myForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorsService.firstNameAndLastnamePattern
          ),
        ],
      ],
      // email: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern(this.validatorsService.emailPattern),
      //   ],
      //   [new EmailValidatorService()],
      // ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
        [this.emailValidatorService],
      ],
      username: [
        '',
        [Validators.required, this.validatorsService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'password',
          'passwordConfirm'
        ),
      ],
    }
  );

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}

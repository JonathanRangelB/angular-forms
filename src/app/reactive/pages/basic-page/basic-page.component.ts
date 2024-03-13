import { Component, inject } from '@angular/core';
import { FormBuilder, Validators as Val } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent {
  formBuilder = inject(FormBuilder);
  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // less code alternative
  myForm = this.formBuilder.group({
    name: ['', [Val.required, Val.minLength(3)]],
    price: [0, [Val.required, Val.min(0)]],
    inStorage: [0, [Val.required, Val.min(0)]],
  });

  onSave() {
    if (this.myForm.invalid) return;
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

  isValidField(field: string) {
    if (!this.myForm.get(field)) return;
    return this.myForm.get(field)?.touched && this.myForm.get(field)?.errors;
  }

  getFieldError(field: string) {
    if (!this.myForm.get(field)) return;
    if (!this.myForm.get(field)?.errors) return;
    const errors = this.myForm.get(field)?.errors || {};
    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe de tener mínimo ${errors['minlength'].requiredLength} characters`;
      }
    }
    return;
  }
}

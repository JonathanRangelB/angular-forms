import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  private fb = new FormBuilder();
  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  newFovorite: FormControl = new FormControl('', Validators.required);

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string) {
    if (!this.myForm.get(field)) return;
    return this.myForm.get(field)?.touched && this.myForm.get(field)?.errors;
  }

  isValidFieldArray(formArray: FormArray, index: number) {
    if (!formArray.controls[index]) return;
    return (
      formArray.controls[index].touched && formArray.controls[index].errors
    );
  }

  onDeletaFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorites() {
    if (this.newFovorite.invalid) return;
    // esta es una manera de agregar un nuevo control a un FormArray, pero si ya estamos usando un formbuilder, podemos usar el método control pues usamos eso entonces
    // this.favoriteGames.push(
    //   new FormControl(this.newFovorite.value, Validators.required)
    // );
    this.favoriteGames.push(
      this.fb.control(this.newFovorite.value, Validators.required)
    );
    this.newFovorite.reset();
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

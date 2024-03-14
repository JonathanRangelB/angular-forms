import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });
        if (email === 'jonathan@rangel.com') {
          subscriber.next({ emailTaken: true });
        } else {
          subscriber.next(null);
        }
        subscriber.complete();
      }
    );

    return httpCallObservable.pipe(delay(2000));
  }
  // forma alternativa mas corta de hacerlo
  // cuando se usa asyncvalidatorfn no es necesario implementar nada en la clase
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   console.log({ email: control.value });

  //   return of({ emailTaken: true }).pipe(delay(2000));
  // }

  // antigua manera de hacerlo
  // validate(
  //   control: AbstractControl<any, any>
  // ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log(email);
  //   return of({ emailTaken: true });
  // }
}

// manera en el mundo real de hacerlo
// this.http.get('http://localhost:3000/usuarios?email=' + email).pipe(
//   map(resp => {
//     return (resp.length === 0)? null : { emailTaken: true }
//   })
// )

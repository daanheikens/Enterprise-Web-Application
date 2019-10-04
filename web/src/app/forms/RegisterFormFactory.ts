import {FormGroup, Validators} from '@angular/forms';
import {AbstractFormFactory} from './AbstractFormFactory';

export class RegisterFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      screenName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      image: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
}


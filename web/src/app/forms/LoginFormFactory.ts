import {AbstractFormFactory} from './AbstractFormFactory';
import {FormGroup, Validators} from '@angular/forms';

export class LoginFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}

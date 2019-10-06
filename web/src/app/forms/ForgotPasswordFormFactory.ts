import {AbstractFormFactory} from './AbstractFormFactory';
import {FormGroup, Validators} from '@angular/forms';

export class ForgotPasswordFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
}

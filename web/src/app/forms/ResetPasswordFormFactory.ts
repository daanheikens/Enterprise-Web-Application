import {AbstractFormFactory} from './AbstractFormFactory';
import {FormGroup, Validators} from '@angular/forms';

export class ResetPasswordFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      token: ['', Validators.required],
    });
  }
}

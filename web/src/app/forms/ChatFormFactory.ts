import {AbstractFormFactory} from './AbstractFormFactory';
import {FormGroup, Validators} from '@angular/forms';

export class ChatFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      chatMessage: ['', Validators.required]
    });
  }
}

import {AbstractFormFactory} from './AbstractFormFactory';
import {FormGroup, Validators} from '@angular/forms';

export class NewGameFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      maxPlayers: ['4', Validators.required],
      maxTurnTime: ['60', Validators.required],
      maxPendingTime: ['720', Validators.required]
    });
  }
}

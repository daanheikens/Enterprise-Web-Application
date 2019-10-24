import {AbstractFormFactory} from './AbstractFormFactory';
import {FormGroup, Validators} from '@angular/forms';

export class NewGameFormFactory extends AbstractFormFactory {

  public createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      maxPlayers: ['', Validators.required],
      maxTurnTime: ['', Validators.required],
      maxPendingTime: ['', Validators.required]
    });
  }
}

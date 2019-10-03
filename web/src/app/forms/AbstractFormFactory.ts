import {FormBuilder, FormGroup} from '@angular/forms';

interface FormFactory {
  /** Method used to build the form */
  createForm(): FormGroup
}

/**
 * Base class which holds shared properties and shared method
 */
export abstract class AbstractFormFactory implements FormFactory {
  protected formBuilder: FormBuilder;

  public constructor() {
    this.formBuilder = new FormBuilder();
  }

  /** This is (apparently) neccesairy since TypeScript does require that abstract classes ALSO implement the interface methods. */
  public abstract createForm(): FormGroup;
}

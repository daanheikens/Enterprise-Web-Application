import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordResetService} from '../../services/password-reset.service';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {ForgotPasswordFormFactory} from '../../forms/ForgotPasswordFormFactory';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public loading = false;
  public submitted = false;
  public success = '';

  public constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService
  ) {
  }

  public ngOnInit(): void {
    this.forgotPasswordForm = new ForgotPasswordFormFactory().createForm();
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const body = new HttpParams()
      .set('email', this.formControls.email.value);

    this.loading = true;

    this.passwordResetService.requestNewPassword(body)
      .pipe(first())
      .subscribe(
        () => {
          this.success = 'Password reset e-mail has been send';
          this.loading = false;
        },
        () => {
          this.success = 'Password reset e-mail has been send';
          this.loading = false;
        });

    this.forgotPasswordForm.reset();
  }
}

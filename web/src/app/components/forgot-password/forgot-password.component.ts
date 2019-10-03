import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService
  ) {
  }

  ngOnInit() {
    this.forgotPasswordForm = new ForgotPasswordFormFactory().createForm();
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  public onSubmit() {
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
        data => {
          this.success = 'Password reset e-mail has been send';
          this.loading = false;
        },
        error => {
          this.success = 'Password reset e-mail has been send';
          this.loading = false;
        });

    this.forgotPasswordForm.reset();
  }
}

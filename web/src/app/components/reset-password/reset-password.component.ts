import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordResetService} from '../../services/password-reset.service';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public resetPasswordForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error = '';
  public success = '';
  private subscribedParamaters: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.subscribedParamaters.unsubscribe();
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      token: ['', Validators.required],
    });

    this.subscribedParamaters = this.activatedRoute.queryParams.subscribe(params => {
      this.formControls['token'].setValue(params['token']);
    });
  }

  get formControls() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    const body = new HttpParams()
      .set('newPassword', this.formControls.newPassword.value);

    this.loading = true;

    this.passwordResetService.createNewPassword(this.formControls.token.value, body)
      .pipe(first())
      .subscribe(
        data => {
          this.success = 'Password reset e-mail has been send';
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

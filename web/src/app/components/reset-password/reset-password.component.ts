import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordResetService} from '../../services/user/password-reset.service';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ResetPasswordFormFactory} from '../../forms/ResetPasswordFormFactory';

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
  private subscribedParameters: Subscription;

  public constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnDestroy(): void {
    this.subscribedParameters.unsubscribe();
  }

  public ngOnInit(): void {
    this.resetPasswordForm = new ResetPasswordFormFactory().createForm();

    this.subscribedParameters = this.activatedRoute.queryParams.subscribe(params => {
      this.formControls['token'].setValue(params['token']);
    });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      this.error = 'An error has occured, contact an Administrator';
      return;
    }

    const body = new HttpParams()
      .set('newPassword', this.formControls.newPassword.value);

    this.loading = true;

    this.passwordResetService.createNewPassword(this.formControls.token.value, body)
      .pipe(first())
      .subscribe(
        () => {
          this.success = 'Password reset e-mail has been send';
          this.loading = false;
          return this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

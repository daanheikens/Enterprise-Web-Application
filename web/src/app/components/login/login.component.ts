import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpParams} from '@angular/common/http';
import {LoginFormFactory} from '../../forms/LoginFormFactory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  public ngOnInit(): void {
    this.loginForm = new LoginFormFactory().createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const body = new HttpParams()
      .set('username', this.formControls.username.value)
      .set('password', this.formControls.password.value)
      .set('grant_type', 'password')
      .set('scope', 'player');

    this.loading = true;
    this.authService.login(body)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        }, () => {
          this.error = 'Invalid credentials';
          this.loading = false;
        });
  }
}

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {first} from 'rxjs/operators';
import {RegisterFormFactory} from '../../forms/RegisterFormFactory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  private selectedFiles: FileList;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.registerForm = new RegisterFormFactory().createForm();
    this.returnUrl = '/home';
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  public selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const body = new FormData();
    body.set('screenName', this.formControls.screenName.value);
    body.set('username', this.formControls.username.value);
    body.set('password', this.formControls.password.value);
    body.set('email', this.formControls.email.value);
    body.set('street', this.formControls.street.value);
    body.set('number', this.formControls.number.value);
    body.set('city', this.formControls.city.value);
    body.set('file', this.selectedFiles.item(0));

    this.loading = true;
    this.userService.register(body)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

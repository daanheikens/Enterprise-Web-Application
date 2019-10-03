import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {first} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {NgAnalyzedFile} from '@angular/compiler';
import {RegisterFormFactory} from '../../forms/RegisterFormFactory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  private selectedFiles: FileList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.registerForm = new RegisterFormFactory().createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/game';
  }

  get formControls() {
    return this.registerForm.controls;
  }

  public selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const body = new FormData();
    body.set('screenName', this.formControls.screenName.value);
    body.set('username', this.formControls.username.value);
    body.set('password', this.formControls.password.value);
    body.set('email', this.formControls.password.value);
    body.set('file', this.selectedFiles.item(0));

    this.loading = true;
    this.userService.register(body)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}

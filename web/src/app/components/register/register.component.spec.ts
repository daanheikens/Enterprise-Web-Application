import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {ButtonsModule, ModalModule, WavesModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../../app.component';
import {BoardComponent} from '../board/board.component';
import {GameComponent} from '../game/game.component';
import {BottombarComponent} from '../bottombar/bottombar.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {WelcomeComponent} from '../UI/welcome/welcome.component';
import {HeaderComponent} from '../UI/welcome/header/header.component';
import {GameListComponent} from '../game-list/game-list.component';
import {OverlayComponent} from '../overlay/overlay.component';
import {GameFormComponent} from '../game-form/game-form.component';
import {InvitesComponent} from '../invites/invites.component';
import {ChatComponent} from '../chat/chat.component';
import {LoginComponent} from '../login/login.component';
import {UserService} from '../../services/user/user.service';
import {UserWidgetsComponent} from '../user-widgets/user-widgets.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BoardComponent,
        GameComponent,
        BottombarComponent,
        RegisterComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        BoardComponent,
        WelcomeComponent,
        HeaderComponent,
        GameListComponent,
        OverlayComponent,
        GameFormComponent,
        InvitesComponent,
        ChatComponent,
        LoginComponent,
        UserWidgetsComponent
      ],
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        WavesModule,
        ButtonsModule,
        NgSelectModule,
        ModalModule.forRoot(),
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  /**
   * @author Daan Heikens
   */
  it('Should create HTML header', async () => {
    const formTitle = element.querySelector('.card-header');
    expect(formTitle.textContent).toContain('Magical Maze register');
  });

  /**
   * @author Daan Heikens
   */
  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Daan Heikens
   */
  it('Should call the onSubmit method', async () => {
    spyOn(component, 'onSubmit');
    const submitButton = element.querySelector('.btn.btn-primary');
    submitButton.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * @author Daan Heikens
   */
  it('register form should return invalid when required parameter is missing', async () => {
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    let formControls = component.formControls;
    formControls.screenName.setValue('UT_name');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    formControls.username.setValue('UT_username');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    formControls.password.setValue('UT_password');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    formControls.email.setValue('ut@ut.com');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    formControls.street.setValue('utstreet');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    formControls.number.setValue('69');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
    formControls.city.setValue('UT_city');
    component.onSubmit();
    expect(component.registerForm.invalid).toBeTruthy();
  });

  /**
   * @author Daan Heikens
   */
  it('Register form should be valid', async () => {
    let formControls = component.formControls;

    formControls.screenName.setValue('UT_name');
    formControls.username.setValue('UT_username');
    formControls.password.setValue('UT_password');
    formControls.email.setValue('ut@ut.com');
    formControls.street.setValue('utstreet');
    formControls.number.setValue('69');
    formControls.city.setValue('UT_city');
    formControls.image.patchValue('');
    formControls.image.setErrors(null);
    let file = new Blob();
    const fileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    component.selectFile({target: {files: fileList}});
    component.onSubmit();

    expect(component.registerForm.invalid).toBeFalsy();
    expect(formControls.screenName.value).toBe('UT_name');
    expect(formControls.username.value).toBe('UT_username');
    expect(formControls.password.value).toBe('UT_password');
    expect(formControls.email.value).toBe('ut@ut.com');
    expect(formControls.street.value).toBe('utstreet');
    expect(formControls.number.value).toBe('69');
    expect(formControls.city.value).toBe('UT_city');
  });

  /**
   * @author Daan Heikens
   */
  it('Register form should be invalid when invalid email', async () => {
    let formControls = component.formControls;
    formControls.screenName.setValue('UT_name');
    formControls.username.setValue('UT_username');
    formControls.password.setValue('UT_password');
    formControls.email.setValue('ut@ut');
    formControls.street.setValue('utstreet');
    formControls.number.setValue('69');
    formControls.city.setValue('UT_city');
    formControls.image.patchValue('');
    formControls.image.setErrors(null);
    let file = new Blob();
    const fileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    component.selectFile({target: {files: fileList}});
    component.onSubmit();

    expect(component.registerForm.invalid).toBeFalsy();
  });
});

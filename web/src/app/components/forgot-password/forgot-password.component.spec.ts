import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotPasswordComponent} from './forgot-password.component';
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
import {RegisterComponent} from '../register/register.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {WelcomeComponent} from '../UI/welcome/welcome.component';
import {HeaderComponent} from '../UI/welcome/header/header.component';
import {GameListComponent} from '../game-list/game-list.component';
import {OverlayComponent} from '../overlay/overlay.component';
import {GameFormComponent} from '../game-form/game-form.component';
import {InvitesComponent} from '../invites/invites.component';
import {ChatComponent} from '../chat/chat.component';
import {LoginComponent} from '../login/login.component';
import {UserWidgetsComponent} from '../user-widgets/user-widgets.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let element: any;

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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  /**
   * @author Lars Bruins Slot
   */
  it('Should call the onSubmit method', async () => {
    spyOn(component, 'onSubmit');
    const submitButton = element.querySelector('.btn.btn-primary');
    submitButton.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  /**
   * @author Lars Bruins Slot
   */
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.forgotPasswordForm).toBeTruthy();
    expect(component.loading).toBe(false)
    expect(component.submitted).toBe(false)
  });

  /**
   * @author Lars Bruins Slot
   */
  it('Check form validation', async () => {
    component.onSubmit();
    expect(component.forgotPasswordForm.invalid).toBeTruthy();
    let formControls = component.formControls;
    expect(component.forgotPasswordForm.invalid).toBeTruthy();
    formControls.email.setValue('test@test.nl');
    expect(component.forgotPasswordForm.invalid).toBeFalsy()
    component.onSubmit();
  });
});

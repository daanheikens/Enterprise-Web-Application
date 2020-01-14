import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {GameFormComponent} from '../../game-form/game-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {ButtonsModule, ModalModule, WavesModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../../../app.component';
import {BoardComponent} from '../../board/board.component';
import {GameComponent} from '../../game/game.component';
import {BottombarComponent} from '../../bottombar/bottombar.component';
import {RegisterComponent} from '../../register/register.component';
import {ResetPasswordComponent} from '../../reset-password/reset-password.component';
import {ForgotPasswordComponent} from '../../forgot-password/forgot-password.component';
import {HeaderComponent} from './header/header.component';
import {GameListComponent} from '../../game-list/game-list.component';
import {OverlayComponent} from '../../overlay/overlay.component';
import {InvitesComponent} from '../../invites/invites.component';
import {ChatComponent} from '../../chat/chat.component';
import {LoginComponent} from '../../login/login.component';
import {UserWidgetsComponent} from '../../user-widgets/user-widgets.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

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
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

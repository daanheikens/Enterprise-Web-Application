import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {AppComponent} from '../../../../app.component';
import {BoardComponent} from '../../../board/board.component';
import {GameComponent} from '../../../game/game.component';
import {BottombarComponent} from '../../../bottombar/bottombar.component';
import {RegisterComponent} from '../../../register/register.component';
import {ResetPasswordComponent} from '../../../reset-password/reset-password.component';
import {ForgotPasswordComponent} from '../../../forgot-password/forgot-password.component';
import {WelcomeComponent} from '../welcome.component';
import {GameListComponent} from '../../../game-list/game-list.component';
import {OverlayComponent} from '../../../overlay/overlay.component';
import {GameFormComponent} from '../../../game-form/game-form.component';
import {InvitesComponent} from '../../../invites/invites.component';
import {ChatComponent} from '../../../chat/chat.component';
import {LoginComponent} from '../../../login/login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppRoutingModule} from '../../../../app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ButtonsModule, ModalModule, WavesModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterTestingModule} from '@angular/router/testing';
import {UserWidgetsComponent} from '../../../user-widgets/user-widgets.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

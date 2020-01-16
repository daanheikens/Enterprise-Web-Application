import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BottombarComponent} from './bottombar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {BrowserModule, By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {ButtonsModule, ModalModule, WavesModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppComponent} from '../../app.component';
import {BoardComponent} from '../board/board.component';
import {GameComponent} from '../game/game.component';
import {RegisterComponent} from '../register/register.component';
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
import {UserWidgetsComponent} from '../user-widgets/user-widgets.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('BottombarComponent', () => {
  let component: BottombarComponent;
  let fixture: ComponentFixture<BottombarComponent>;
  let componentHTML: HTMLElement;
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottombarComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });

  /**
   * @author Sebastiaan van de Griendt
   */
  it('should have a button with Speel', () => {
    let button = fixture.debugElement.queryAll(By.css('button'));
    let button1: HTMLButtonElement = button[0].nativeElement;
    expect(button1.textContent).toBe('Speel');
  });

  /**
   * @author Sebastiaan van de Griendt
   */

  it('should have a button with Quit', () => {
    let button = fixture.debugElement.queryAll(By.css('button'));
    let button1: HTMLButtonElement = button[1].nativeElement;
    expect(button1.textContent).toBe('Quit');
  });

  /**
   * @author Sebastiaan van de Griendt
   */
  it('should have a button with Help on ', () => {
    let button = fixture.debugElement.queryAll(By.css('button'));
    let button1: HTMLButtonElement = button[2].nativeElement;
    expect(button1.textContent).toBe('Help');
  });

  /**
   * @author Sebastiaan van de Griendt
   */
  it('button should not be named banaan', () => {
    let button = fixture.debugElement.queryAll(By.css('button'));
    let button1: HTMLButtonElement = button[1].nativeElement;
    expect(button1.textContent).not.toContain('banaan');
  });

  /**
   * @author Sebastiaan van de Griendt
   */
  it('should load its images', () => {
    let count = 0;
    componentHTML.querySelectorAll('img').forEach((img: HTMLImageElement) => {
      fixture.detectChanges();
      setTimeout(() => {
        expect(img).toBeTruthy();
        expect(img.complete).toBeTruthy();
      }, 30);
      count++;
    });
    expect(count).toEqual(2);
  });

  /**
   * @author Sebastiaan van de Griendt
   */
  it('should check playButton is enabled', async(() => {
    let loginBtn: HTMLButtonElement;
    loginBtn = fixture.debugElement.query(By.css('#playButton')).nativeElement;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(loginBtn.disabled).toBe(false);
    });
  }));

  /**
   * @author Sebastiaan van de Griendt
   */
  it('should check quitButton is enabled', async(() => {
    let quitBtn: HTMLButtonElement;
    quitBtn = fixture.debugElement.query(By.css('#quitButton')).nativeElement;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(quitBtn.disabled).toBe(false);
    });
  }));
});

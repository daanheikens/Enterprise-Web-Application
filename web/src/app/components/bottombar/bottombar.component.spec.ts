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

describe('BottombarComponent', () => {
  let component: BottombarComponent;
  let fixture: ComponentFixture<BottombarComponent>;
  let componentHTML: HTMLElement;

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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottombarComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentHTML).toBeTruthy();
  });
  /**
   * @author Sebastiaan van de Griendt
   */
  it('should have a button with Speel, Quit & Help on ',() =>{
    let button = fixture.debugElement.queryAll(By.css('button'));
    let button1 : HTMLButtonElement = button[0].nativeElement;
    let button2 : HTMLButtonElement = button[1].nativeElement;
    let button3 : HTMLButtonElement = button[2].nativeElement;
    expect(button1.textContent).toBe('Speel');
    expect(button2.textContent).toBe('Quit');
    expect(button3.textContent).toBe('Help');
  });

  it('button should not be named banaan', () =>{
    let button = fixture.debugElement.queryAll(By.css('button'));
    let button1 : HTMLButtonElement = button[1].nativeElement;
    expect(button1.textContent).not.toContain('banaan')
  });


  it('should load its images', () => {
    componentHTML.querySelectorAll('img').forEach((img: HTMLImageElement)=>{
      expect(img).toBeTruthy();
      expect(img.complete).toBeTruthy();

    })
  })
});

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BottombarComponent} from './components/bottombar/bottombar.component';
import {GameComponent} from './components/game/game.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './auth/interceptors/jwt.interceptor';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {WelcomeComponent} from './components/UI/welcome/welcome.component';
import {HeaderComponent} from './components/UI/welcome/header/header.component';
import {GameListComponent} from './components/game-list/game-list.component';
import {OverlayComponent} from './components/overlay/overlay.component';
import {ButtonsModule, ModalModule, WavesModule} from 'angular-bootstrap-md';
import { MatInputModule} from '@angular/material';
import { GameFormComponent } from './components/game-form/game-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    BottombarComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    BoardComponent,
    WelcomeComponent,
    HeaderComponent,
    GameListComponent,
    OverlayComponent,
    GameFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    WavesModule,
    ButtonsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ModalModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

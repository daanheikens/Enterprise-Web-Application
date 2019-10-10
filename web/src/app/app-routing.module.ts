import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GameComponent} from './components/game/game.component';
import {AuthGuard} from './auth/auth.guard';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {TokenGuard} from './auth/token.guard';
import {WelcomeComponent} from './components/UI/welcome/welcome.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  // Public routes
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [TokenGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  // Authenticated routes (See guard)
  {path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  {path: 'home', component: WelcomeComponent, canActivate: [AuthGuard]},
  // Fallback route
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

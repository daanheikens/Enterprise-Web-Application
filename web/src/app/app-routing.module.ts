import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {GameComponent} from './components/game/game.component';
import {AuthGuard} from './auth/auth.guard';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {TokenGuard} from './auth/token.guard';

const routes: Routes = [
  // Public routes
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [TokenGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  // Authenticated routes (See guard)
  {path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  // Fallback route
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

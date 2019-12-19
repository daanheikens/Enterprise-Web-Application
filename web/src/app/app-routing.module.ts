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
import {GameListComponent} from './components/game-list/game-list.component';
import {InvitesComponent} from './components/invites/invites.component';

const routes: Routes = [
  // Public routes
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [TokenGuard]},
  // Authenticated routes (See guard)
  {path: 'home', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'game-list', component: GameListComponent, canActivate: [AuthGuard]},
  {path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  {path: 'invites', component: InvitesComponent, canActivate: [AuthGuard]},
  // Fallback route
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

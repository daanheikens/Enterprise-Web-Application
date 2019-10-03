import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {GameComponent} from './components/game/game.component';
import {AuthGuard} from './auth/auth.guard';
import {RegisterComponent} from './components/register/register.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  // Public routes
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetpasswordComponent},
  {path: 'forgot-password', component: ForgotpasswordComponent},
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

import {Component} from '@angular/core';
import {User} from './model/User';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EWA';
  currentUser: Object;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
      .then(r => {});
  }
}

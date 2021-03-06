import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'EWA';
  public currentUser: Object;

  public constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
      .then(r => {
      });
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = 'Daan';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router)
  {}

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
      .then(r => {});
  }
}

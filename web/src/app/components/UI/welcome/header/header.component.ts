import { Component, OnInit } from '@angular/core';
import {WelcomeComponent} from '../welcome.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = 'Daan';
  constructor() { }

  ngOnInit() {
  }

}

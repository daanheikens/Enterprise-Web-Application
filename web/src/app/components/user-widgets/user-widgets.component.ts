import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/User';

@Component({
  selector: 'app-user-widgets',
  templateUrl: './user-widgets.component.html',
  styleUrls: ['./user-widgets.component.css']
})
export class UserWidgetsComponent implements OnInit {

  @Input()
  private users: User[];

  constructor() {
  }

  public ngOnInit(): void {
  }
}

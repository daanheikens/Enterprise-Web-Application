import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  public invites: any;

  constructor() { }

  public ngOnInit() {
  }

  public joinGame(gameId: any) {

  }
}

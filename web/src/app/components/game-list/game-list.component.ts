import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Game} from '../../model/Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  public games: Game[];

  constructor(private readonly gameService: GameService) {
  }

  public ngOnInit(): void {
    this.gameService.getGames()
      .subscribe(data => {
        this.games = data;
      });
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game/game.service';
import {Game} from '../../model/Game';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {

  public games: Game[];

  private refreshInterval;

  public constructor(
    private readonly gameService: GameService,
    private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.refresh();
    this.refreshInterval = setInterval(() => {
      this.refresh();
    }, 5000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
  }

  public joinGame(id: number) {
    if (id <= 0) {
      return;
    }

    const body = new HttpParams()
      .set('gameId', String(id));

    this.gameService.joinGame(body)
      .subscribe(result => {
        this.router.navigate(['/game']);
      });
  }

  public refresh(): void {
    this.gameService.getGames()
      .subscribe(data => {
        this.games = data;
      });
  }
}

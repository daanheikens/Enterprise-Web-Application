import {Component, OnInit} from '@angular/core';
import {Tile} from '../../model/Tile';
import {GameService} from '../../services/game.service';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public placeAbleTile: Tile;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  public onPlaceableTileChanged(tile: Tile) {
    this.placeAbleTile = tile;
  }

  public onCreate() {
    const body = new HttpParams()
      .set('maxPlayers', '4')
      .set('maxTurnTime', '4')
      .set('maxPendingTime', '3600');
    this.gameService.create(body).pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

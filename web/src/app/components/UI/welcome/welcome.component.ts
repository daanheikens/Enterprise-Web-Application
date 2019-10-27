import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../model/Game';
import {Router} from '@angular/router';
import {GameFormComponent} from '../../game-form/game-form.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @ViewChild(GameFormComponent, {static: false})
  private gameForm: GameFormComponent;
  private game: Game;

  public constructor(
    private readonly gameService: GameService,
    private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.gameService.getCurrentGame()
      .subscribe(data => this.game = data);
  }

  public continueGame(): void {
    this.router.navigate(['/game']);
  }

  public showModal(): void {
    this.gameForm.showModal();
  }
}

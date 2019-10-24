import {Component, OnInit} from '@angular/core';
import {GameService} from '../../../services/game.service';
import {Game} from '../../../model/Game';
import {first} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AbstractControl, FormGroup} from '@angular/forms';
import {NewGameFormFactory} from '../../../forms/NewGameFormFactory';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  /**
   * Form properties
   */
  public newGameForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error = '';

  private game: Game;
  private inGame = false;

  public constructor(
    private readonly gameService: GameService,
    private readonly router: Router) {
  }

  public ngOnInit(): void {
    this.newGameForm = new NewGameFormFactory().createForm();
    this.gameService.getCurrentGame()
      .subscribe(data => {
        this.game = data;
        if (this.game !== null) {
          this.inGame = true;
        }
      });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.newGameForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.newGameForm.invalid) {
      return;
    }

    const body = new HttpParams()
      .set('name', this.formControls.name.value)
      .set('maxPlayers', this.formControls.maxPlayers.value)
      .set('maxTurnTime', this.formControls.maxTurnTime.value)
      .set('maxPendingTime', this.formControls.maxPendingTime.value);

    this.gameService.create(body).pipe(first())
      .subscribe(
        data => {
          this.game = data;
          this.router.navigate(['/game']);
        });
  }

  public continueGame(): void {
    this.router.navigate(['/game']);
  }
}

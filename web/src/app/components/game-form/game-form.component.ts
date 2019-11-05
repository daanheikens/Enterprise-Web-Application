import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {GameService} from '../../services/game.service';
import {Router} from '@angular/router';
import {NewGameFormFactory} from '../../forms/NewGameFormFactory';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @ViewChild('formModal', {static: false})
  public formModal: ModalDirective;

  public newGameForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error = '';

  public constructor(
    private readonly gameService: GameService,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.newGameForm = new NewGameFormFactory().createForm();
  }

  public get formControls(): { [p: string]: AbstractControl } {
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

    this.gameService.create(body)
      .pipe(first())
      .subscribe(
        () => this.router.navigate(['/game']),
        () => this.error = 'Game could not be created. Please contact an administrator'
      );
  }

  public showModal(): void {
    this.formModal.show();
  }

  public hideModal(): void {
    this.formModal.hide();
  }
}
import {Component, OnInit} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {TestAnimation} from '../animations/TestAnimation';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [TestAnimation]
})
export class BoardComponent implements OnInit {

  currentState = 'initial';
  arrowUp = faArrowUp;
  arrowDown = faArrowDown;
  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;

  constructor() {
  }

  ngOnInit() {
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
}

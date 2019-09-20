import {Component, OnInit} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  arrowUp = faArrowUp;
  arrowDown = faArrowDown;
  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;

  constructor() {
  }

  ngOnInit() {
  }
}

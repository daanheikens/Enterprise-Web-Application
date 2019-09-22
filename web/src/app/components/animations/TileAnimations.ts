import {animate, state, style, transition, trigger} from '@angular/animations';

export const TileAnimations = [
  trigger('replaceImg-top', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '0'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ]),
  trigger('replaceImg-right', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '0'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ]),
  trigger('replaceImg-bottom', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '0'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ]),
  trigger('replaceImg-left', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '0'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ])
];

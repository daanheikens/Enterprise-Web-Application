import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * Array which holds the animations. Currently 4 animations for each side, it might be changed to 1 if it is possible.
 * state changes currently only holds opacity 1 due to we probably want to play with opacity in the keyframes of the animation
 * This ensures the opacity a.k.a. visibility of the image will be set to 1 in it's final state to prevent flickering
 */
export const TileAnimations = [
  trigger('replaceImg-top', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '1'
    })),
    transition('initial=>final', animate('1000ms'))
  ]),
  trigger('replaceImg-right', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '1'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ]),
  trigger('replaceImg-bottom', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '1'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ]),
  trigger('replaceImg-left', [
    state('initial', style({
      opacity: '1'
    })),
    state('final', style({
      opacity: '1'
    })),
    transition('initial=>final', animate('1000ms')),
    transition('final=>initial', animate('1000ms'))
  ])
];

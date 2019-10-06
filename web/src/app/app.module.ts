import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BottombarComponent} from './components/bottombar/bottombar.component';
import { GameComponent } from './components/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    BottombarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

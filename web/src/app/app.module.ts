import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { WelcomeComponent } from './components/UI/welcome/welcome.component';
import { HeaderComponent } from './components/UI/welcome/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    WelcomeComponent,
    HeaderComponent
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

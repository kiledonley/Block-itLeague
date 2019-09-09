import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexibleSquareComponent } from './flexible-square/flexible-square.component';
import { BlocketLeagueComponent } from './blocket-league/blocket-league.component';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FlexibleSquareComponent,
    BlocketLeagueComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

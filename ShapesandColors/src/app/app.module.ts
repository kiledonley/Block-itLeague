import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexibleSquareComponent } from './flexible-square/flexible-square.component';
import { BlocketLeagueComponent } from './blocket-league/blocket-league.component';

@NgModule({
  declarations: [
    AppComponent,
    FlexibleSquareComponent,
    BlocketLeagueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

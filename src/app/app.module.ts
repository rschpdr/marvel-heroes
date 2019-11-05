import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeroesService } from './../services/heroes/heroes.service';
import { CharacterDetailComponent } from './routes/character-detail/character-detail.component';
import { CharacterListComponent } from './routes/character-list/character-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterDetailComponent,
    CharacterListComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule {}

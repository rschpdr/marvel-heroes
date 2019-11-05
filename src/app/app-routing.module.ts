import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './routes/character-list/character-list.component';
import { CharacterDetailComponent } from './routes/character-detail/character-detail.component';

const routes: Routes = [
  { path: 'character/:id', component: CharacterDetailComponent },
  { path: '', component: CharacterListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CharacterListComponent } from './routes/character-list/character-list.component';
import { CharacterDetailComponent } from './routes/character-detail/character-detail.component';
import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';

it('Should render without crashing', async () => {
  const component = await render(AppComponent, {
    declarations: [
      CharacterDetailComponent,
      CharacterListComponent,
      ErrorMessageComponent,
      LoadingSpinnerComponent
    ],
    routes: [
      { path: '', component: CharacterListComponent },
      { path: 'character/:id', component: CharacterDetailComponent }
    ]
  });

  expect(component).toBeDefined();
});

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { render } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';

import { HeroesService } from './../../../services/heroes/heroes.service';
import { CharacterListComponent } from './character-list.component';
import { LoadingSpinnerComponent } from './../../components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './../../components/error-message/error-message.component';

const service = createMock(HeroesService);

const mockResponse = {
  data: {
    results: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Dohn Joe' }]
  }
};

service.fetchHeroes.mockImplementation(() => of(mockResponse));

it('Should render without crashing', async () => {
  const { getByText } = await render(CharacterListComponent, {
    componentProviders: [
      {
        provide: HeroesService,
        useValue: service
      }
    ],
    declarations: [LoadingSpinnerComponent, ErrorMessageComponent],
    imports: [RouterTestingModule]
  });

  expect(getByText('Characters'));

  expect(getByText('John Doe'));
});

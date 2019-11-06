import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { render } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';

import { HeroesService } from './../../../services/heroes/heroes.service';
import { CharacterDetailComponent } from './character-detail.component';
import { LoadingSpinnerComponent } from './../../components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './../../components/error-message/error-message.component';

const service = createMock(HeroesService);
let route = { paramMap: null };

const mockResponse = {
  data: {
    results: [
      {
        id: 1,
        name: 'John Doe',
        thumbnail: { path: 'path/to/image', extension: 'jpg' },
        description: 'lorem ipsum dolor amet'
      }
    ]
  }
};

service.fetchHero.mockImplementation(() => of(mockResponse));
route.paramMap = of({ params: { id: 1 } });

it('Should render without crashing', async () => {
  const { getByText } = await render(CharacterDetailComponent, {
    componentProviders: [
      {
        provide: HeroesService,
        useValue: service
      },
      {
        provide: ActivatedRoute,
        useValue: route
      }
    ],
    declarations: [LoadingSpinnerComponent, ErrorMessageComponent],
    imports: [RouterTestingModule]
  });

  expect(getByText('John Doe Details'));

  expect(getByText('1'));

  expect(getByText('lorem ipsum dolor amet'));
});

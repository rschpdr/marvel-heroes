import { HeroesService } from './heroes.service';
import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

const http = {
  get: jest.fn()
};

const hashingService = {
  getTimestamp: jest.fn(),
  hashKeys: jest.fn(),
  publicKey: 'asd79a7s9d87a9s8d79a8s',
  privateKey: 'SIAdas98ueasidu88whdajsdasf'
};

let service: HeroesService;

beforeEach(() => {
  service = new HeroesService(http as any, hashingService as any);
});

it('Should create an instance without crashing', () => {
  expect(service).toBeDefined();
});

it('Should return a HttpParams object', () => {
  expect(service.defineParams()).toBeInstanceOf(HttpParams);
});

it('Should fetch a list of characters from the api', () => {
  http.get.mockReturnValueOnce(
    of({
      data: {
        results: [{ id: 1, name: 'John Doe' }, { id: 1, name: 'Dohn Joe' }]
      }
    })
  );

  service.fetchHeroes().subscribe((response: any) => {
    expect(response).toEqual({
      data: {
        results: [{ id: 1, name: 'John Doe' }, { id: 1, name: 'Dohn Joe' }]
      }
    });
  });

  expect(http.get.mock.calls[0][0]).toBe(
    'https://gateway.marvel.com/v1/public/characters'
  );
});

it('Should fetch details of the character whose id was provided', () => {
  http.get.mockReturnValueOnce(
    of({
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
    })
  );

  service.fetchHero(1).subscribe((response: any) => {
    expect(response).toEqual({
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
    });
  });

  expect(http.get.mock.calls[1][0]).toBe(
    'https://gateway.marvel.com/v1/public/characters/1'
  );
});

import { render } from '@testing-library/angular';

import { HashingService } from './hashing.service';

let hashingService: HashingService;

beforeEach(() => {
  hashingService = new HashingService();
});

it('Should create an instance without crashing', () => {
  expect(hashingService).toBeDefined();
});

it('Returns a timestamp string', async () => {
  const spy = jest.spyOn(hashingService, 'getTimestamp');
  spy.mockReturnValue('1572994453');

  expect(hashingService.getTimestamp()).toBe('1572994453');
  expect(spy).toHaveBeenCalled();
});

it('Returns a md5 hash string of provided keys', async () => {
  const mockTs = '1572994453';
  const mockPubKey = 'AflRwvBjba23xoT9CPAJ';
  const mockPrivKey = 'wQ0fulJW6Qaf9RllACnaKZpv31IPGTw';

  expect(hashingService.hashKeys(mockTs, mockPubKey, mockPrivKey)).toBe(
    '99786b14eec94bc8aff6ab49577a5cff'
  );
});

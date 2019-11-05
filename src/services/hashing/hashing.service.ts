import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import keys from '../../../apiKeys';

@Injectable({
  providedIn: 'root'
})
export class HashingService {
  public readonly publicKey = keys.publicKey;
  readonly privateKey = keys.privateKey;

  constructor() {}

  getTimestamp() {
    return Date.now().toString();
  }

  hashKeys() {
    const stringToBeHashed = `${this.getTimestamp()}${this.privateKey}${
      this.publicKey
    }`;
    const result = Md5.hashStr(stringToBeHashed, false);
    return result.toString();
  }
}

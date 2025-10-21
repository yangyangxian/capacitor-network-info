import { WebPlugin } from '@capacitor/core';

import type { NetworkInfoPlugin } from './definitions';

export class NetworkInfoWeb extends WebPlugin implements NetworkInfoPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

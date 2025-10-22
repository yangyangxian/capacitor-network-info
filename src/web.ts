import { WebPlugin } from '@capacitor/core';

import type { NetworkInfoPlugin, IP } from './definitions';

export class NetworkInfoWeb extends WebPlugin implements NetworkInfoPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getCurrentIp(): Promise<IP> {
    // Web implementation not provided. Signal this clearly to callers.
    throw new Error('getCurrentIp is not implemented on web platform');
  }
}

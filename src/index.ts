import { registerPlugin } from '@capacitor/core';

import type { NetworkInfoPlugin } from './definitions';

const NetworkInfo = registerPlugin<NetworkInfoPlugin>('NetworkInfo', {
  web: () => import('./web').then((m) => new m.NetworkInfoWeb()),
});

export * from './definitions';
export { NetworkInfo };

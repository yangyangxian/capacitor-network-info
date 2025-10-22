import { registerPlugin } from '@capacitor/core';

import type { NetworkInfoPlugin } from './definitions';
import { IP } from './definitions';
import { validateShape } from './utils/validation';

const NetworkInfo = registerPlugin<NetworkInfoPlugin>('NetworkInfo', {
  web: () => import('./web').then((m) => new m.NetworkInfoWeb()),
});

export * from './definitions';
export { NetworkInfo };

// Wrapper function that calls native plugin and validates payload keys
export async function getCurrentIp(): Promise<IP> {
  // Call native plugin directly
  const raw = await (NetworkInfo as any).getCurrentIp();

  if (!raw || typeof raw !== 'object') {
    console.error('[NetworkInfo] Invalid payload: expected object', raw);
    throw new Error('Invalid payload: expected object');
  }

  const result = validateShape(IP, raw, { throwOnMismatch: false, prefix: '[NetworkInfo]' });
  if (!result.ok) {
    console.error('[NetworkInfo] Payload keys mismatch', { missing: result.details.missing, unexpected: result.details.unexpected });
    throw new Error(result.message);
  }

  const expectedKeys = Object.keys(new IP(''));
  const value = (raw as any)[expectedKeys[0]];
  return new IP(String(value));
}

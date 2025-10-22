type ShapeResult = {
  expected: string[];
  actual: string[];
  missing: string[];
  unexpected: string[];
};

function compareShape(expectedKeys: string[], actualKeys: string[]): ShapeResult {
  const missing = expectedKeys.filter(k => !actualKeys.includes(k));
  const unexpected = actualKeys.filter(k => !expectedKeys.includes(k));
  return { expected: expectedKeys, actual: actualKeys, missing, unexpected };
}

export type ValidateOptions = {
  throwOnMismatch?: boolean;
  prefix?: string;
  ctorArgs?: any[];
};

/**
 * Validate the shape of `raw` against an expected shape.
 * `expectedSource` can be:
 *  - a constructor function (class) -> an instance will be created with optional `opts.ctorArgs` to derive keys
 *  - an object instance -> keys will be derived from it
 *  - an array of expected key strings
 * Returns { ok, message?, details } where details contains expected/actual/missing/unexpected
 */
export function validateShape(expectedSource: { new(...args: any[]): any } | Record<string, any> | string[], raw: Record<string, any>, opts?: ValidateOptions) {
  const prefix = opts && opts.prefix ? opts.prefix : '[Shape]';
  let expectedKeys: string[];

  if (Array.isArray(expectedSource)) {
    expectedKeys = expectedSource;
  } else if (typeof expectedSource === 'function') {
    const ctorArgs = (opts && opts.ctorArgs) ? opts.ctorArgs : [];
    expectedKeys = Object.keys(new (expectedSource as any)(...ctorArgs));
  } else {
    expectedKeys = Object.keys(expectedSource as any);
  }

  const actualKeys = Object.keys(raw);
  console.log(`${prefix} expectedKeys:`, expectedKeys, 'actualKeys:', actualKeys);

  if (expectedKeys.length !== actualKeys.length) {
    console.error(`${prefix} Payload field count mismatch`, { expected: expectedKeys.length, got: actualKeys.length });
    const msg = `Payload field count mismatch. Expected ${expectedKeys.length}, got ${actualKeys.length}`;
    const details = compareShape(expectedKeys, actualKeys);
    if (opts && opts.throwOnMismatch === false) {
      return { ok: false, message: msg, details };
    }
    throw new Error(msg);
  }

  const details = compareShape(expectedKeys, actualKeys);
  if (details.missing.length || details.unexpected.length) {
    const msg = `Payload keys mismatch. Missing: [${details.missing.join(', ')}]; Unexpected: [${details.unexpected.join(', ')}]`;
    if (opts && opts.throwOnMismatch === false) {
      return { ok: false, message: msg, details };
    }
    throw new Error(msg);
  }

  return { ok: true, details };
}

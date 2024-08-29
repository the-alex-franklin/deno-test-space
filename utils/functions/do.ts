export function Do<T>(fn: () => T): T {
  return fn();
}

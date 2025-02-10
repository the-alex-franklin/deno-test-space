/* deno-fmt-ignore-file */
export function flow<T1, T2>(fn1: (value: T1) => T2): T2;
export function flow<T1, T2, T3>(fn1: (value: T1) => T2, fn2: (value: T2) => T3): T3;
export function flow<T1, T2, T3, T4>(fn1: (value: T1) => T2, fn2: (value: T2) => T3, fn3: (value: T3) => T4): T4;
export function flow<T1, T2, T3, T4, T5>(fn1: (value: T1) => T2, fn2: (value: T2) => T3, fn3: (value: T3) => T4, fn4: (value: T4) => T5): T5;
export function flow<T1, T2, T3, T4, T5, T6>(fn1: (value: T1) => T2, fn2: (value: T2) => T3, fn3: (value: T3) => T4, fn4: (value: T4) => T5, fn5: (value: T5) => T6): T6;
export function flow<T1, T2, T3, T4, T5, T6, T7>(fn1: (value: T1) => T2, fn2: (value: T2) => T3, fn3: (value: T3) => T4, fn4: (value: T4) => T5, fn5: (value: T5) => T6, fn6: (value: T6) => T7): T7;

export function flow(...fns: ((value: any) => any)[]) {
  return (value: any) => fns.reduce((acc, fn) => fn(acc), value);
}

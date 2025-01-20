/* deno-fmt-ignore-file */
import type { MaybePromise } from "../types/MaybePromise.ts";

type AsyncFunction<T, U> = (input: Awaited<T>) => MaybePromise<U>;

export function asyncFlow<T1, T2>(f1: AsyncFunction<T1, T2>): (input: MaybePromise<T1>) => Promise<Awaited<T2>>;
export function asyncFlow<T1, T2, T3>(f1: AsyncFunction<T1, T2>, f2: AsyncFunction<T2, T3>): (input: MaybePromise<T1>) => Promise<Awaited<T3>>;
export function asyncFlow<T1, T2, T3, T4>(f1: AsyncFunction<T1, T2>, f2: AsyncFunction<T2, T3>, f3: AsyncFunction<T3, T4>): (input: MaybePromise<T1>) => Promise<Awaited<T4>>;
export function asyncFlow<T1, T2, T3, T4, T5>(f1: AsyncFunction<T1, T2>, f2: AsyncFunction<T2, T3>, f3: AsyncFunction<T3, T4>, f4: AsyncFunction<T4, T5>): (input: MaybePromise<T1>) => Promise<Awaited<T5>>;
export function asyncFlow<T1, T2, T3, T4, T5, T6>(f1: AsyncFunction<T1, T2>, f2: AsyncFunction<T2, T3>, f3: AsyncFunction<T3, T4>, f4: AsyncFunction<T4, T5>, f5: AsyncFunction<T5, T6>): (input: MaybePromise<T1>) => Promise<Awaited<T6>>;
export function asyncFlow<T1, T2, T3, T4, T5, T6, T7>(f1: AsyncFunction<T1, T2>, f2: AsyncFunction<T2, T3>, f3: AsyncFunction<T3, T4>, f4: AsyncFunction<T4, T5>, f5: AsyncFunction<T5, T6>, f6: AsyncFunction<T6, T7>): (input: MaybePromise<T1>) => Promise<Awaited<T7>>;

export function asyncFlow<T, Fns extends AsyncFunction<any, any>[]>(...restFns: Fns): (input: MaybePromise<T>) => Promise<Awaited<ReturnType<Fns[number]>>> {
  return (input: MaybePromise<T>) => restFns.reduce<Promise<any>>((acc, fn) => acc.then(fn), Promise.resolve(input));
}

if (import.meta.main) {
  const { delay } = await import("./delay.ts")
  const example = asyncFlow(
    (x: number) => x * 4,
    async (x) => {
      await delay(1000);
      return x + 3;
    },
    (x) => x.toString()
  );

  console.log(await example(2));
}

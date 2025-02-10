/* deno-fmt-ignore-file */
import type { MaybePromise } from "../types/MaybePromise.ts";

type AsyncFunction<T, U> = (input: Awaited<T>) => MaybePromise<U>;

export function asyncPipe<T1>(f1: MaybePromise<T1>): Promise<Awaited<T1>>;
export function asyncPipe<T1, T2>(f1: MaybePromise<T1>, f2: AsyncFunction<T1, T2>): Promise<Awaited<T2>>;
export function asyncPipe<T1, T2, T3>(f1: MaybePromise<T1>, f2: AsyncFunction<T1, T2>, f3: AsyncFunction<T2, T3>): Promise<Awaited<T3>>;
export function asyncPipe<T1, T2, T3, T4>(f1: MaybePromise<T1>, f2: AsyncFunction<T1, T2>, f3: AsyncFunction<T2, T3>, f4: AsyncFunction<T3, T4>): Promise<Awaited<T4>>;
export function asyncPipe<T1, T2, T3, T4, T5>(f1: MaybePromise<T1>, f2: AsyncFunction<T1, T2>, f3: AsyncFunction<T2, T3>, f4: AsyncFunction<T3, T4>, f5: AsyncFunction<T4, T5>): Promise<Awaited<T5>>;
export function asyncPipe<T1, T2, T3, T4, T5, T6>(f1: MaybePromise<T1>, f2: AsyncFunction<T1, T2>, f3: AsyncFunction<T2, T3>, f4: AsyncFunction<T3, T4>, f5: AsyncFunction<T4, T5>, f6: AsyncFunction<T5, T6>): Promise<Awaited<T6>>;
export function asyncPipe<T1, T2, T3, T4, T5, T6, T7>(f1: MaybePromise<T1>, f2: AsyncFunction<T1, T2>, f3: AsyncFunction<T2, T3>, f4: AsyncFunction<T3, T4>, f5: AsyncFunction<T4, T5>, f6: AsyncFunction<T5, T6>, f7: AsyncFunction<T6, T7>): Promise<Awaited<T7>>;

export function asyncPipe<T, Fns extends (AsyncFunction<any, any>)[]>(initialValue: MaybePromise<T>, ...restFns: Fns): Promise<Awaited<ReturnType<Fns[number]>>> {
  return restFns.reduce<Promise<any>>((acc, fn) => acc.then(fn), Promise.resolve(initialValue));
}

if (import.meta.main) {
  const { delay } = await import("./delay.ts")

  console.log(
    await asyncPipe(
      2,
      (x) => (x * 4).toString(),
      async (x) => {
        await delay(1000);
        return x + 3;
      },
    )
  )
}

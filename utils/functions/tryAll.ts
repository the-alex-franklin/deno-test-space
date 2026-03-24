// deno-fmt-ignore-file
import { Failure, Success } from "./try.ts";

export async function tryAll<T extends Promise<unknown>[]>(promises: [...T]): Promise<{ [K in keyof T]: Success<Awaited<T[K]>> | Failure }> {
	return (await Promise.allSettled(promises)).map((promise) => {
		if (promise.status === "fulfilled") return Success(promise.value);
		return Failure(promise.reason);
	}) as { [K in keyof T]: Success<Awaited<T[K]>> | Failure };
}

if (import.meta.main) {
	const { delay } = await import("./delay.ts");

	const [a, b, c, d] = await tryAll([
		delay(1000).then(() => "one" as const),
		delay(1000).then(() => { throw NaN; }),
		Promise.resolve("three" as const),
		Promise.reject(Infinity),
	]);

	console.log([a, b, c, d]);
}

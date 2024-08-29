// deno-fmt-ignore-file
export type Success<T> = { success: true; failure: false; data: T; };
export type Failure<E> = { success: false; failure: true; error: E };

export function Success<T>(data: T): Success<T> {
	return { success: true, failure: false, data };
}

export function Failure<E>(error: E): Failure<E> {
	return { success: false, failure: true, error };
}

export function Try<T, E extends Error = Error>(fn: () => T): Extract<T, Promise<any>> extends never ? Failure<E> | Success<T> : Promise<Failure<E> | Success<Awaited<T>>>;
export function Try<T, E extends Error = Error>(fn: () => T): Failure<E> | Success<T> | Promise<Failure<E> | Success<Awaited<T>>> {
	try {
		const result = fn();
		if (result instanceof Promise) return result.then(Success, Failure)

		return Success(result);
	} catch (error) {
		return Failure(error);
	}
}

// Example usage:
if (import.meta.main) {
	const { nextTick } = await import("node:process");
	const { range } = await import("./range.ts");

	const iterations = 100000;
	const start_try = performance.now();

	for (const i of range(iterations)) {
		const thing = Try(() => nextTick(() => {}));
	}

	const end_try = performance.now();

	const duration = end_try - start_try;
	console.log(`Duration: ${duration / iterations} ms`);
	// =================================================
	const start_async_try = performance.now();

	for (const i of range(iterations)) {
		const thing = await Try(() => new Promise<void>((resolve) => nextTick(resolve)));
	}

	const end_async_try = performance.now();

	const async_duration = end_async_try - start_async_try;
	console.log(`Async Duration: ${async_duration / iterations} ms`);
}

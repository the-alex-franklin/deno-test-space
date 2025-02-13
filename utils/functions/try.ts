// deno-fmt-ignore-file
export type Success<T> = { success: true; failure: false; data: T; };
export type Failure = { success: false; failure: true; error: Error };

export function Success<T>(data: T): Success<T> {
	return { success: true, failure: false, data };
}

export function Failure(error: unknown): Failure {
	return {
		success: false,
		failure: true,
		error: error instanceof Error ? error :
			new Error(typeof error === "string" ? error : JSON.stringify(error)),
	};
}

export function Try<T>(fn: () => T): Extract<T, Promise<any>> extends never ? Failure | Success<T> : Promise<Failure | Success<Awaited<T>>>;
export function Try<T>(fn: () => T): Failure | Success<T> | Promise<Failure | Success<Awaited<T>>> {
	try {
		const result = fn();
		if (result instanceof Promise) return result.then(Success, Failure);

		return Success(result);
	} catch (error) {
		return Failure(error);
	}
}

// Example usage:
if (import.meta.main) {
	const { delay } = await import("./delay.ts");

	const [r1, r2] = await Promise.all([
		Try(async () => {
			await delay(1000);
			return 5;
		}),
		Try(async () => {
			await delay(1000);
			throw 5;
		}),
	]);

	if (r1?.success) console.log("#1 This should log");
	if (r2?.failure) console.log("#2 This should log");

	// =================================================

	const { nextTick } = await import("node:process");
	const { range } = await import("./range.ts");

	const iterations = 100000;
	const start_try = performance.now();

	for (const i of range(iterations)) {
		Try(() => nextTick(() => {}));
	}

	const end_try = performance.now();

	const duration = end_try - start_try;
	console.log(`Duration: ${duration} ms`);
	// =================================================
	const start_async_try = performance.now();

	for (const i of range(iterations)) {
		await Try(() => new Promise<void>((resolve) => nextTick(resolve)));
	}

	const end_async_try = performance.now();

	const async_duration = end_async_try - start_async_try;
	console.log(`Async Duration: ${async_duration} ms`);
}

// deno-fmt-ignore-file
export type Success<T> = { success: true; failure: false; data: T; };
export type Failure = { success: false; failure: true; error: Error };

export function Success<T>(data: T): Success<T> {
	return { success: true, failure: false, data };
}

export function Failure(error: unknown): Failure {
	if (error instanceof Error) return { success: false, failure: true, error };

	return {
		success: false,
		failure: true,
		error: new Error(
			typeof error === "string" ? error :
			isNaN(error as any) ? "NaN" :
			!isFinite(error as any) ? "Infinity" :
			JSON.stringify(error)
		),
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
	const { z } = await import("npm:zod@^3.24.2");
	const { default: axios } = await import("npm:axios@^1.8.1");

	const post_schema = z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
	});

	const result = await Try(() =>
		axios.get<unknown>("https://jsonplaceholder.typicode.com/posts/1")
			.then((res) => res.data)
			.then(post_schema.parse)
	);

	if (result.success) console.log(result.data);
	else console.log(result.error);
}

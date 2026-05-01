// deno-fmt-ignore-file
import { z } from "zod";
import { coerceError } from "./coerceError.ts";

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
			coerceError(error),
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
	const postSchema = z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
		blah: z.string()
	})

	const result = await Try(() =>
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then((res) => res.json())
			.then(postSchema.parse)
	);

	if (result.success) console.log(result.data);
	else console.log(result.error);
}

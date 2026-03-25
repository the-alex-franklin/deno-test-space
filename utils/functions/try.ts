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
	type Post = { userId: number; id: number; title: string; body: string };

	function parsePost(data: unknown): Post {
		if (typeof data !== "object" || data === null) throw new Error("Invalid post shape");

		const { userId, id, title, body } = data as Record<string, unknown>;
		if (typeof userId !== "number") throw new Error("Invalid userId");
		if (typeof id !== "number") throw new Error("Invalid id");
		if (typeof title !== "string") throw new Error("Invalid title");
		if (typeof body !== "string") throw new Error("Invalid body");

		return { userId, id, title, body };
	}

	const result = await Try(() =>
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then((res) => res.json())
			.then(parsePost)
	);

	if (result.success) console.log(result.data);
	else console.log(result.error);
}

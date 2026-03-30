export async function allOptional<T extends Promise<unknown>[]>(
	promises: [...T],
) {
	return (await Promise.allSettled(promises)).map((promise) => {
		if (promise.status === "fulfilled") return promise.value;
	}, []) as { [K in keyof T]: Awaited<T[K]> };
}

if (import.meta.main) {
	const [
		a = "a",
		b = "b",
		c = "c",
	] = await allOptional([
		Promise.resolve(1),
		Promise.reject(2),
		Promise.resolve(3),
	]);

	console.log(a, b, c);
}

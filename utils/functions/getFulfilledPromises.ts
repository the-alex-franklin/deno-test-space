export async function getFulfilledPromises<T extends Promise<unknown>[]>(promises: [...T]) {
	return (await Promise.allSettled(promises)).reduce<unknown[]>((acc, r) => {
		if (r.status === "fulfilled") acc.push(r.value);
		return acc;
	}, []) as { [K in keyof T]: Awaited<T[K]> };
}

if (import.meta.main) {
	const results = await getFulfilledPromises([
		Promise.resolve(1),
		Promise.reject(2),
		Promise.resolve("3"),
	]);

	console.log(results);
}

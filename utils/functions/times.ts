export function times<T>(n: number, fn: (i: number) => T): T[] {
	const arr: T[] = [];
	for (let i = 0; i < n; i++) arr.push(fn(i));
	return arr;
}

if (import.meta.main) {
	const output = times(3, (i) => i + 1);
	console.log({ output });
}

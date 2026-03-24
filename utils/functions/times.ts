export function times<T>(n: number, fn: (i: number) => T): T[] {
	const arr: T[] = [];
	for (let i = 0; i < n; i++) arr.push(fn(i));
	return arr;
}

declare global {
	interface Number {
		times: <T>(fn: (i: number) => T) => T[];
	}
}

Number.prototype.times = function <T>(fn: (i: number) => T): T[] {
	const arr: T[] = [];
	for (let i = 0; i < this.valueOf(); i++) arr.push(fn(i));
	return arr;
};

if (import.meta.main) {
	const output = (3).times((i) => i + 1);
	console.log({ output });
}

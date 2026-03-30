// deno-lint-ignore-file no-unused-labels
import { range } from "./utils/functions/range.ts";

const input = range(200000);
console.log(input.length);

const arr_start = performance.now();

const arr_answer = (() => {
	outer: for (let i = 1; true; i++) {
		inner: for (const j of input) {
			if (i === j) continue outer;
		}
		return i;
	}
})();

const arr_end = performance.now();

console.log(arr_answer);
console.log(`arr solution: ${(arr_end - arr_start) / 1000}s`);

const obj_start = performance.now();

const obj: { [key: number]: true } = {};
for (const num of input) {
	obj[num] = true;
}

const obj_answer = (() => {
	let i = 0;
	while (true) if (!obj[++i]) return i;
})();

const obj_end = performance.now();

console.log(obj_answer);
console.log(`obj solution: ${(obj_end - obj_start) / 1000}s`);

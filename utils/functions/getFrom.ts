import { isNullish } from "./isNullish.ts";
import type { Nullish } from "../types/Nullish.ts";
import type { Widen } from "../types/Widen.ts";

export function getFrom<T extends Record<PropertyKey, unknown>>(
	obj: T | Nullish,
	key: Widen<keyof T> | Nullish,
): T[keyof T] | undefined {
	if (isNullish(obj)) return;
	if (isNullish(key)) return;

	if (Object.hasOwn(obj, key)) return obj[key];
}

if (import.meta.main) {
	const obj = { a: 1, b: 2 };
	const str: string = "b";

	const a = obj["a"]; // 1
	// const a2 = obj[str]; // this alerts a false error
	const b = getFrom(obj, str);
	// otherwise, what is needed is something more like:
	if (str in obj) obj[str as keyof typeof obj];
	// or, even worse
	(obj as any)[str];
}

import { Widen } from "./index.ts";

function useValue<T>(value: Widen<T>, defaultValue: NoInfer<Widen<T>>): Widen<T> {
	return value !== undefined ? value : defaultValue;
}

// Example usage:
if (import.meta.main) {
	const result1 = useValue("Hello", "Default"); // ✅ Works fine

	const thing = Math.random() > 0.5 ? 42 : undefined as never;
	const result2 = useValue(thing, 0); // ✅ Works fine
	// const result3 = useValue(42, "Not a number"); // ❌ Type error, as designed
}

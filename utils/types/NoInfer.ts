import { Widen } from "./index.ts";

function useValue<T>(value: Widen<T>, defaultValue: NoInfer<Widen<T>>): Widen<T> {
	return value !== undefined ? value : defaultValue;
}

// Example usage:
if (import.meta.main) {
	const result1 = useValue("Hello", "Default"); // ✅ Works fine
	const result2 = useValue(42, 0); // ✅ Works fine
	// const result3 = useValue(42, "Not a number"); // ❌ Type error, as designed
}

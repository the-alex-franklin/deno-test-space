function useValue<T>(value: T, defaultValue: NoInfer<T>): T {
  return value !== undefined ? value : defaultValue;
}

// Example usage:
const result1 = useValue<string>("Hello", "Default"); // ✅ Works fine
const result2 = useValue<number>(42, 0); // ✅ Works fine
// const result3 = useValue<number>(42, "Not a number"); // ❌ Type error, as expected

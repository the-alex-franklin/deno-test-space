export function coerceErrorMessage(error: unknown): string {
	if (typeof error === "string") return error;
	if (typeof error === "number") {
		if (isNaN(error)) return "NaN";
		if (!isFinite(error)) return "Infinity";
		return String(error);
	}
	if (typeof error === "bigint") return String(error);
	if (typeof error === "symbol") return error.description ?? error.toString();
	if (error === null) return "null";
	if (error === undefined) return "undefined";
	if (typeof error === "object") {
		try {
			return JSON.stringify(error);
		} catch {
			return Object.prototype.toString.call(error);
		}
	}
	return String(error);
}

import { all, type ConfigOptions, create } from "npm:mathjs";
import { Try } from "./utils/functions/try.ts";

// Configure mathjs to use arbitrary precision
const config: ConfigOptions = {
	// Number of significant digits
	precision: 32,
	// Don't convert to numbers automatically
	number: "BigNumber",
};

const math = create(all!, config);

function calc(input: string) {
	const result = Try(() => math.evaluate(input) as unknown);
	if (result.failure) return { error: result.error.message };

	return {
		result: result.data?.toString(),
		decimalPlaces: math.format(result.data, { precision: 20 }),
		scientific: math.format(result.data, { notation: "exponential" }),
	};
}

// Example calculations that would normally have floating point errors
const calculations = {
	// Basic arithmetic
	addition: calc("0.1 + 0.2"), // Exactly 0.3

	// Recurring decimals
	division: calc("1 / 3"), // Exact representation of 1/3

	// Large numbers
	factorial: calc("50!"), // Exact 50 factorial

	// Complex calculations
	complex: calc("(2.7 + 3.1i) * (1.5 - 2.2i)"),

	// Transcendental numbers
	pi: math.pi, // High precision π
	e: math.e, // High precision e

	// Financial calculations
	compound: calc("(1 + 0.05)^12"), // Exact compound interest
};

// Scientific notation example
const scientificNotation = math.format(calculations.factorial, {
	notation: "exponential",
	precision: 10,
});

// Comparing exact values
const comparison = {
	exact: calc("0.1 + 0.2 == 0.3"), // true
	floatingPoint: 0.1 + 0.2 === 0.3, // false in regular JS
};

// Example usage
const examples = [
	calc("1.23456789 * 9.87654321"),
	calc("2^53 + 1"), // Beyond normal JavaScript precision
	calc("sin(pi/6)"), // Exact trigonometric values
];

console.log("Calculations:", calculations);
console.log("50! in scientific notation:", scientificNotation);
console.log("Comparisons:", comparison);
console.log("Example calculations:", examples);

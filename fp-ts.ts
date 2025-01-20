import Fraction from "npm:fraction.js";
import { flow } from "fp-ts/function.ts";
import { left, match as matchEither, right } from "fp-ts/Either.ts";
import { match as matchOption, none, some } from "fp-ts/Option.ts";
import { Try } from "./utils/functions/try.ts";

const { log, error } = console;
const toFraction = (x: number) => new Fraction(x).toFraction();

const inverseEither = flow(
	(x: number, y: number = 1) => {
		if (x === 0) return left("can't divide by 0");
		return right(toFraction(y / x));
	},
	matchEither(
		(e) => error(e),
		(x) => log(x),
	),
);

inverseEither(1);

const inverseOption = flow(
	(x: number, y: number = 1) => {
		if (x === 0) return none;
		return some(toFraction(y / x));
	},
	matchOption(
		() => error("can't divide by 0"),
		(x) => log(x),
	),
);

inverseOption(1);

function inverseTry(x: number, y = 1) {
	const result = Try(() => {
		if (x === 0) throw new Error("can't divide by 0");
		return toFraction(y / x);
	});

	if (result.failure) error(result.error);
	else log(result.data);
}

inverseTry(1);

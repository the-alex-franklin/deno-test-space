import { Decimal } from "decimal.js";

Decimal.set({
	precision: 100,
	toExpNeg: -103,
	toExpPos: 100,
});

const dist_to_sun = new Decimal(149597870700);
const light_speed = new Decimal(299792458);

const time_in_seconds = dist_to_sun.div(light_speed);
const total_minutes = time_in_seconds.div(60).floor();
const remaining_seconds = time_in_seconds.minus(total_minutes.times(60));

console.log(`${total_minutes.toString()}m ${remaining_seconds.toFixed(2)}s`);

const pi = Decimal.acos(-1);
const halfPi = pi.div(2);
const result = Decimal.cos(halfPi);

// should be exactly 0, but it's not,
// because irrational numbers are not representable in finite memory
console.log(result.toString());

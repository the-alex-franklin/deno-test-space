const arr = [0, 1, 1, 2, 3, "3", true, "true", true, false];
// print the unique values and their counts

const seen = new Map();

arr.forEach((el) => {
	if (!seen.has(el)) {
		seen.set(el, 1);
	} else {
		const curr = seen.get(el);
		seen.set(el, curr + 1);
	}
});

console.log(seen);

/* Implicit assumption: The array being searched in already sorted and continuous */
const list = Array.from({ length: 1000 }, (_, i) => i);

function binarySearch(arr: number[], target: number): number {
	let left = 0;
	let right = arr.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) return mid;
		if (arr[mid]! < target) left = mid + 1;
		if (arr[mid]! > target) right = mid - 1;
	}

	throw new Error("Target not in list");
}

const target = 1000;
binarySearch(list, target);

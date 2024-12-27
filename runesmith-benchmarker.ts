const start = performance.now();

let count = 0;
Deno.addSignalListener("SIGINT", () => {
	const end = performance.now();
	console.log(`\nTotal time: ${(end - start).toFixed(6)}ms`);
	console.log(`Total requests: ${count}`);
	console.log(`requests per second: ${(count / ((end - start) / 1000)).toFixed(6)}`);
	Deno.exit();
});

while (true) {
	const start = performance.now();
	await fetch("http://localhost:5173/animated-chart");
	const end = performance.now();
	console.log(`Time taken: ${(end - start).toFixed(6)}ms`);
	count++;
}

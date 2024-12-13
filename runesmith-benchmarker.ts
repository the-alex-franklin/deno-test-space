import axios from "axios";

const start = performance.now();

Deno.addSignalListener("SIGINT", () => {
	const end = performance.now();
	console.log(`Total time: ${end - start}ms`);
	Deno.exit();
});

while (true) {
	const start = performance.now();
	const { data } = await axios.get("http://localhost:5173/animated-chart");
	console.log(data);
	const end = performance.now();
	console.log("Time taken: ", end - start);
}

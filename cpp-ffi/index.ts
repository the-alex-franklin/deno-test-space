const lib = Deno.dlopen("./cpp-ffi/looper.so", {
	"looper": {
		nonblocking: true,
		parameters: ["i32"],
		result: "void",
	},
});

const start = performance.now();
await lib.symbols.looper(100);
const end = performance.now();
console.log(`Total time: ${(end - start).toFixed(6)}ms`);

lib.close();

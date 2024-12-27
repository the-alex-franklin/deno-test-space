const compile = new Deno.Command("gcc", {
	args: ["-shared", "-o", "looper.so", "looper.cpp"],
});

await compile.output();

import { delay } from "./utils/index.ts";

console.log(
	!!(new Promise(() => true)),
);

await delay(4000);

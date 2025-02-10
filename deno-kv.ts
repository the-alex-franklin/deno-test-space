const kv = await Deno.openKv();

const random_uuid = "83ff1c67-b583-45bc-aed1-08160b7ac162";

await kv.set([random_uuid], { fruit: "apples" });
const user = await kv.get([random_uuid]);
console.log(user);

kv.close();

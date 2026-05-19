import z from "zod";

const thing_schema = z.object({
	id: z.number(),
	title: z.string(),
}).strict();

type Thing = z.infer<typeof thing_schema>;

const isThing = (value: unknown): value is Thing => (
	thing_schema.safeParse(value).success
);

console.log(
	isThing({
		id: 1,
		title: "blah",
		// extra: "asdfasdf",
	}),
);

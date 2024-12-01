import { z } from "zod";
import { pipe } from "./utils/functions/pipe.ts";

const parsed_categories = pipe(
  z.string()
    .transform((c) => new Set(c.split(",")))
    .pipe(z.set(z.enum(["deposits", "expenses", "transfers"])))
    .parse([
      "deposits",
      "expenses",
      "transfers",
      "deposits",
      "expenses",
      "transfers",
    ].join(",")),
);

console.log(parsed_categories);

import type { ZodType } from "zod";
import { z } from "zod";

export class ZodSchemas {
  static idParamSchema = z.object({
    id: z.preprocess(
      (a) => Number(a),
      z.number().int().positive("ID must be a positive integer.")
    ),
  });
}

export function idParamSchema(
  idParamSchema: any
): import("express-serve-static-core").RequestHandler<
  import("express-serve-static-core").ParamsDictionary,
  any,
  any,
  import("qs").ParsedQs,
  Record<string, any>
> {
  throw new Error("Function not implemented.");
}

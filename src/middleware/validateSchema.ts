import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import type { ZodType } from "zod";

interface ValidationErrorDetail {
  path: string;
  message: string;
}

export class ValidationMiddleware {
  private handleZodError(
    error: ZodError,
    res: Response,
    messagePrefix = "Validation failed"
  ) {
    console.error(`${messagePrefix} Error:`, error.issues);
    return res.status(400).json({
      message: messagePrefix,
      errors: error.issues.map((err /*: ZodError['issues'][number]*/) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  private handleUnexpectedError(
    error: unknown,
    res: Response,
    messagePrefix = "Internal server error during validation."
  ) {
    console.error(`Unexpected error in ${messagePrefix} middleware:`, error);
    res.status(500).json({ error: messagePrefix });
  }

  public validateBody<T>(schema: ZodType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = schema.parse(req.body);
        (req as any).validatedBody = parsed; // add a Request augmentation if you want strong typing
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          this.handleZodError(error, res, "Request body validation failed");
        } else {
          this.handleUnexpectedError(error, res, "Body validation");
        }
      }
    };
  }

  public validateParams<T>(schema: ZodType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.params);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          this.handleZodError(
            error,
            res,
            "Request parameters validation failed"
          );
        } else {
          this.handleUnexpectedError(error, res, "Parameter validation");
        }
      }
    };
  }
}

export const validationMiddleware = new ValidationMiddleware();

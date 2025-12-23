import { z } from 'zod';

export const responseBaseSchema = <T extends z.ZodTypeAny>(
  schema: T
): z.ZodObject<{
  errorCode: z.ZodNumber;
  errorMessage: z.ZodNullable<z.ZodString>;
  path: z.ZodString;
  timestamp: z.ZodString;
  data: T;
}> =>
  z.object({
    errorCode: z.number(),
    errorMessage: z.string().nullable(),
    path: z.string(),
    timestamp: z.string(),
    data: schema
  });

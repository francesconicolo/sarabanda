import { ZodSchema } from 'zod';

export function validateObjectSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.warn('⚠️ Schema validation failed:', result.error.issues);
    throw result.error;
  }

  return result.data;
}

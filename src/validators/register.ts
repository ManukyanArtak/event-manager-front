import { ObjectSchema, ValidationError } from "yup";

type ValidationResult =
  | { isValid: true }
  | { isValid: false; errors: Record<string, string> };

export const validateData = async <T>(
  data: T,
  schema: ObjectSchema<Record<string, string>>,
): Promise<ValidationResult> => {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });

    return { isValid: true };
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((item) => {
        if (typeof item.path === "string") errors[item.path] = item.message;
      });
      return { isValid: false, errors };
    } else {
      throw error;
    }
  }
};

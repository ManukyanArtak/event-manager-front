import { number, object, string } from "yup";

export const VerifyDataSchema = object({
  email: string().required().email(),
  code: number().required().min(1000).max(9999),
});

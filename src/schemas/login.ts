import { object, string } from "yup";

export const LoginDataSchema = object({
  email: string().required().email(),
  password: string().required().min(8),
});

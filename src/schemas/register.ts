import { object, string, ref } from "yup";

export const registrationDataSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email(),
  birthday: string().required(),
  gender: string().required(),
  phone: string().required(),
  password: string().required().min(8),
  confirmationPassword: string()
    .required()
    .oneOf([ref("password")], "Passwords must match"),
});

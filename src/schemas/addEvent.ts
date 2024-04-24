import { object, string } from "yup";

export const AddEventSchema = object({
  name: string().required(),
  description: string().required(),
  date: string().required(),
});

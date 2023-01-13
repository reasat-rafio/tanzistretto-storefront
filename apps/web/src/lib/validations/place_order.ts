import { z } from "zod";

export const PlaceOrderSchema = z.object({
  first_name: z
    .string({ required_error: "Firstname is required" })
    .min(1, { message: "Firstname is required" })
    .max(64, { message: "Firstname must be less than 64 characters" })
    .trim(),
  last_name: z
    .string({ required_error: "Lastname is required" })
    .min(1, { message: "Lastname is required" })
    .max(64, { message: "Lastname must be less than 64 characters" })
    .trim(),
  order_notes: z
    .string()
    .max(300, { message: "Note must be less than 300 characters" })
    .optional(),
  address: z
    .string({ required_error: "Address is required" })
    .min(1, { message: "Firstname is required" }),
  phone_number: z.string({ required_error: "Phone number is required" }).trim(),
  email_address: z
    .string({ required_error: "Email is required" })
    .email()
    .trim()
    .optional(),
  post_code: z
    .string({ required_error: "Postcode is required" })
    .min(1, { message: "Postcode is required" }),
  distric: z
    .string({ required_error: "Distric is required" })
    .min(1, { message: "Distric is required" }),
});

export type IPlaceOrderSchema = z.infer<typeof PlaceOrderSchema>;

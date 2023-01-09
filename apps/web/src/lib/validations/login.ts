import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address" }),
  password: z.string({ required_error: "Password is required" }).trim(),
  remember_me: z
    .enum(["on"], {
      required_error: "You must accept the terms and conditions",
    })
    .optional(),
});
export type ILoginSchema = z.infer<typeof LoginSchema>;

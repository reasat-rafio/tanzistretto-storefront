import { z } from 'zod';

export const loginPostReq = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.length > 0),
  password: z.string().min(6),
  //   token: z.string().min(1),
  rurl: z.string(),
});

export const registerPostReq = z
  .object({
    email: z
      .string()
      .email()
      .refine((val) => val.length > 0, {
        message: 'Email is required',
      }),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
    // token: z.string().min(1),
    rurl: z.string(),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The passwords did not match',
      });
    }
  });

export const forgotPostReq = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.length > 0, {
      message: 'Email is required',
    }),
  //   token: z.string().min(1),
  rurl: z.string(),
});

export const resetPostReq = z
  .object({
    email: z
      .string()
      .email()
      .refine((val) => val.length > 0, {
        message: 'Email is required',
      }),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
    code: z.string().min(1),
    // token: z.string().min(1),
    rurl: z.string(),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The passwords did not match',
      });
    }
  });

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);
export const customerDeliveryAddress = z.object({
  fullName: z.string().min(2).max(60),
  address1: z.string().min(2).max(500),
  address2: z.string().min(2).max(500),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(2).max(20),
  countryCode: z.string().min(2).max(5),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
});

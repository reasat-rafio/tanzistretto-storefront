// import { z } from 'zod';

// export const signInReq = z.object({
//   email: z
//     .string()
//     .email()
//     .refine((val) => val.length > 0, {
//       message: 'Email is required',
//     }),
//   password: z.string().min(6),
//   // token: z.string().min(1),
// });

// export const signUpReq = z.object({
//   email: z
//     .string()
//     .email()
//     .refine((val) => val.length > 0, {
//       message: 'Email is required',
//     }),
//   fname: z.string().min(1),
//   lname: z.string().min(1),
//   password: z.string().min(6),
//   // token: z.string().min(1).optional(),
// });

// export const forgotReq = z.object({
//   email: z
//     .string()
//     .email()
//     .refine((val) => val.length > 0, {
//       message: 'Email is required',
//     }),
//   // token: z.string().min(1),
// });

// export const resetReq = z.object({
//   code: z.string().min(1),
//   password: z.string().min(6),
//   // token: z.string().min(1),
// });

// export const addReviewReq = z.object({
//   // token: z.string().min(1),
//   productId: z.string().min(1),
//   displayName: z.string().min(1).max(100),
//   content: z.string().min(1).max(1000),
//   rating: z.coerce.number().min(1).max(5).default(5),
// });

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

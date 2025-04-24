import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8)
  .max(32)
  .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must be 8 characters long with at least 1 uppercase letter, 1 number, and 1 special character.'
);

export const UserSignupSchema = z.object({
    email:z.string().email(),
    username:z.string().min(8,{message:"Username required minimum of 8 characters"}),
    password:passwordSchema,
    photo:z.string().url()
})

export const UserSigninSchema = z.object({
    email:z.string().email(),
    password:passwordSchema
})

export const RoomSchema = z.object({
    name:z.string().min(3).max(20)
})
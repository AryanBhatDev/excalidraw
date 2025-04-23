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
    username:z.string().min(8),
    name:z.string(),
    password:passwordSchema
})

export const UserSigninSchema = z.object({
    username:z.string().min(8),
    password:passwordSchema
})

export const RoomSchema = z.object({
    name:z.string().min(3).max(20)
})
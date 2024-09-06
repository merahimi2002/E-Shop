import { z } from "zod";

const forbiddenCharactersRegex = /[\/\?:@&=\+\$_.!~*'()#]/;

export const ProductSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50)
    .refine((value) => !forbiddenCharactersRegex.test(value), {
      message:
        "you cannot used this characters: / ? : @ & = + $ _ . ! ~ * ' ( ) #",
    }),
  slug: z.string().min(1, "Slug is required").max(50),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().min(1, "Image is required").max(255),
  price: z.number().multipleOf(0.01, "Put two number after point"),
  categoryId: z.number().min(1, "category required"),
});

export const CategorySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50)
    .refine((value) => !forbiddenCharactersRegex.test(value), {
      message:
        "you cannot used this characters: / ? : @ & = + $ _ . ! ~ * ' ( ) #",
    }),
  slug: z.string().min(1, "Slug is required").max(50),
  imageUrl: z.string().min(1, "Image is required").max(255),
});

export const SignInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\/\?:@&=\+\$_.!~*'()#]/, {
      message: "Password must contain at least one special character",
    }),
});

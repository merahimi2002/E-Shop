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
  imageUrl: z.string().min(1, "Image is required").max(255),
});

export const UserSchema = z
  .object({
    email: z.string().email().min(1, "Email is required"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    phone: z
      .string()
      .min(11, "Phone number is 11 character")
      .optional()
      .or(z.literal("")),
    image: z.string().optional(),
    role: z.string().optional(),
    confirmPassword: z.string(),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const UpdateUserSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .min(11, "Phone number is 11 character")
    .optional()
    .or(z.literal("")),
  image: z.string().optional(),
  role: z.string().optional(),
  Password: z.string(),
});

export const ChangePasswordUserSchema = z
  .object({
    email: z.string().email().min(1, "Email is required"),
    oldPassword: z.string(),
    confirmPassword: z.string(),
    newPassword: z
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
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "New Passwords do not match",
  });

export const TwoStepVerificationSchema = z.object({
  UserEmail: z.string().email().min(1, "Email is required"),
  UserName: z.string().optional(),
  VerificationCode: z.string().min(1, "Code is required"),
});

export const LoveCartSchema = z.object({
  productId: z.number().min(1, "Product Id is required"),
  userEmail: z.string().min(1, "User Email is required"),
});

export const ShopCartSchema = z.object({
  quantity: z.number(),
  productId: z.number().min(1, "Product Id is required"),
  userEmail: z.string().min(1, "User Email is required"),
});

import { z } from "zod";

export const loginZodSchema = z.object({
    email : z.email("Invalid email address"),
    password : z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
})

export type ILoginPayload = z.infer<typeof loginZodSchema>;

// ---------------------------------------------------------------------------
// Register Patient — POST /auth/register  { email, name, password }
// ---------------------------------------------------------------------------
export const registerZodSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type IRegisterPayload = z.infer<typeof registerZodSchema>;
export type IRegisterServerPayload = Omit<IRegisterPayload, "confirmPassword">;

// ---------------------------------------------------------------------------
// Forget Password — POST /auth/forget-password  { email }
// ---------------------------------------------------------------------------
export const forgetPasswordZodSchema = z.object({
  email: z.email("Invalid email address"),
});

export type IForgetPasswordPayload = z.infer<typeof forgetPasswordZodSchema>;

// ---------------------------------------------------------------------------
// Verify Email — POST /auth/verify-email  { email, otp }
// ---------------------------------------------------------------------------
export const verifyEmailZodSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z
    .string()
    .trim()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;

// ---------------------------------------------------------------------------
// Reset Password — POST /auth/reset-password  { email, otp, newPassword }
// ---------------------------------------------------------------------------
export const resetPasswordZodSchema = z
  .object({
    email: z.email("Invalid email address"),
    otp: z
      .string()
      .trim()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d{6}$/, "OTP must contain only digits"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((value) => value.newPassword === value.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type IResetPasswordPayload = z.infer<typeof resetPasswordZodSchema>;
export type IResetPasswordServerPayload = Omit<IResetPasswordPayload, "confirmNewPassword">;

// ---------------------------------------------------------------------------
// Change Password — POST /auth/change-password  { currentPassword, newPassword }
// ---------------------------------------------------------------------------
export const changePasswordZodSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((value) => value.newPassword === value.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((value) => value.currentPassword !== value.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;
export type IChangePasswordServerPayload = Omit<IChangePasswordPayload, "confirmNewPassword">;

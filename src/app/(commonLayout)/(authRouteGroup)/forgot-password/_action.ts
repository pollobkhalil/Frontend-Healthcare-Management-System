"use server";

import { getActionErrorMessage } from "@/lib/actionErrorUtils";
import { forgetPassword } from "@/services/auth.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { forgetPasswordZodSchema, type IForgetPasswordPayload } from "@/zod/auth.validation";

export const forgotPasswordAction = async (
  payload: IForgetPasswordPayload,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  const parsedPayload = forgetPasswordZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await forgetPassword(parsedPayload.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to send reset OTP"),
    };
  }
};

"use server";

import { getActionErrorMessage } from "@/lib/actionErrorUtils";
import { resetPasswordWithOtp } from "@/services/auth.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { resetPasswordZodSchema, type IResetPasswordPayload } from "@/zod/auth.validation";

export const resetPasswordAction = async (
  payload: IResetPasswordPayload,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  const parsedPayload = resetPasswordZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const { confirmNewPassword: _confirmNewPassword, ...resetPayload } = parsedPayload.data;
    return await resetPasswordWithOtp(resetPayload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Password reset failed"),
    };
  }
};

"use server";

import { getActionErrorMessage } from "@/lib/actionErrorUtils";
import { changeUserPassword } from "@/services/auth.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { changePasswordZodSchema, type IChangePasswordPayload } from "@/zod/auth.validation";

export const changePasswordAction = async (
  payload: IChangePasswordPayload,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  const parsedPayload = changePasswordZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const { confirmNewPassword: _confirmNewPassword, ...changePayload } = parsedPayload.data;
    return await changeUserPassword(changePayload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change password"),
    };
  }
};

"use server";

import { getActionErrorMessage } from "@/lib/actionErrorUtils";
import { registerPatient } from "@/services/auth.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { registerZodSchema, type IRegisterPayload } from "@/zod/auth.validation";

export const registerAction = async (
  payload: IRegisterPayload,
): Promise<ApiResponse<{ email: string; name: string }> | ApiErrorResponse> => {
  const parsedPayload = registerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const { confirmPassword: _confirmPassword, ...registerPayload } = parsedPayload.data;
    return await registerPatient(registerPayload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Registration failed"),
    };
  }
};

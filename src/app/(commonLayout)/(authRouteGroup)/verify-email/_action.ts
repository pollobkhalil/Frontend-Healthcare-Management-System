"use server";

import { getActionErrorMessage } from "@/lib/actionErrorUtils";
import { verifyEmailOtp } from "@/services/auth.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import { verifyEmailZodSchema, type IVerifyEmailPayload } from "@/zod/auth.validation";

export const verifyEmailAction = async (
  payload: IVerifyEmailPayload,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  const parsedPayload = verifyEmailZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await verifyEmailOtp(parsedPayload.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Email verification failed"),
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Normalizes errors from axios (httpClient) and plain fetch (auth.services.ts)
 * into a single human-readable message for server actions to return to the client.
 */
export const getActionErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    (error as any).response &&
    typeof (error as any).response === "object" &&
    "data" in (error as any).response &&
    (error as any).response.data &&
    typeof (error as any).response.data === "object" &&
    "message" in (error as any).response.data &&
    typeof (error as any).response.data.message === "string"
  ) {
    return (error as any).response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

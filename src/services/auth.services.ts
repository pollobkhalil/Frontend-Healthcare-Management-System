"use server";

import { deleteCookie } from "@/lib/cookieUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { type ApiResponse } from "@/types/api.types";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!BASE_API_URL){
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

/**
 * Throws an Error shaped like an axios error (`error.response.data.message`)
 * so getActionErrorMessage() can handle both fetch-based and axios-based
 * service functions identically.
 */
const throwFetchError = async (res: Response, fallbackMessage: string): Promise<never> => {
    let body: { message?: string } = {};
    try {
        body = await res.json();
    } catch {
        // ignore parse failure, use fallback
    }

    const error = new Error(body.message || fallbackMessage) as Error & {
        response?: { data?: { message?: string } };
    };
    error.response = { data: { message: body.message || fallbackMessage } };
    throw error;
};

export async function getNewTokensWithRefreshToken(refreshToken  : string) : Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Cookie : `refreshToken=${refreshToken}`
            }
        });

        if(!res.ok){
            return false;
        }

        const {data} = await res.json();

        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if(accessToken){
            await setTokenInCookies("accessToken", accessToken);
        }

        if(newRefreshToken){
            await setTokenInCookies("refreshToken", newRefreshToken);
        }

        if(token){
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}

export async function getUserInfo() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        const sessionToken = cookieStore.get("better-auth.session_token")?.value

        if (!accessToken) {
            return null;
        }

        const res = await fetch(`${BASE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`
            }
        });

        if (!res.ok) {
            console.error("Failed to fetch user info:", res.status, res.statusText);
            return null;
        }

        const { data } = await res.json();

        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}

// ---------------------------------------------------------------------------
// Register Patient — POST /auth/register
// ---------------------------------------------------------------------------
export async function registerPatient(payload: {
    name: string;
    email: string;
    password: string;
}): Promise<ApiResponse<{ email: string; name: string }>> {
    const res = await fetch(`${BASE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        await throwFetchError(res, "Registration failed");
    }

    return res.json();
}

// ---------------------------------------------------------------------------
// Forget Password — POST /auth/forget-password
// ---------------------------------------------------------------------------
export async function forgetPassword(payload: { email: string }): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_API_URL}/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        await throwFetchError(res, "Failed to send reset OTP");
    }

    return res.json();
}

// ---------------------------------------------------------------------------
// Verify Email — POST /auth/verify-email
// ---------------------------------------------------------------------------
export async function verifyEmailOtp(payload: {
    email: string;
    otp: string;
}): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        await throwFetchError(res, "Email verification failed");
    }

    return res.json();
}

// ---------------------------------------------------------------------------
// Reset Password — POST /auth/reset-password
// ---------------------------------------------------------------------------
export async function resetPasswordWithOtp(payload: {
    email: string;
    otp: string;
    newPassword: string;
}): Promise<ApiResponse<null>> {
    const res = await fetch(`${BASE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        await throwFetchError(res, "Password reset failed");
    }

    return res.json();
}

// ---------------------------------------------------------------------------
// Change Password — POST /auth/change-password (protected)
// ---------------------------------------------------------------------------
export async function changeUserPassword(payload: {
    currentPassword: string;
    newPassword: string;
}): Promise<ApiResponse<null>> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

    const res = await fetch(`${BASE_API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        await throwFetchError(res, "Failed to change password");
    }

    return res.json();
}

// ---------------------------------------------------------------------------
// Logout — POST /auth/logout (protected)
// ---------------------------------------------------------------------------
export async function logoutUser(): Promise<void> {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        await fetch(`${BASE_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieHeader,
            },
        });
    } catch (error) {
        console.error("Error calling logout endpoint:", error);
    } finally {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        await deleteCookie("better-auth.session_token");
    }
}

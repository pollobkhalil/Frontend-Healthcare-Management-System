"use server";

import { logoutUser } from "@/services/auth.services";
import { redirect } from "next/navigation";

export const logoutAction = async (): Promise<void> => {
  await logoutUser();
  redirect("/login");
};

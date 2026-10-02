"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { resetPasswordAction } from "@/app/(commonLayout)/(authRouteGroup)/reset-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { resetPasswordZodSchema, type IResetPasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ResetPasswordFormProps {
  email: string;
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({ mutationFn: resetPasswordAction });

  const defaultValues: IResetPasswordPayload = {
    email: email || "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || "Password reset failed");
          return;
        }

        router.push("/login");
      } catch (error: any) {
        setServerError(`Password reset failed: ${error.message}`);
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
        <CardDescription>Enter the OTP sent to your email along with your new password.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="email" validators={{ onChange: resetPasswordZodSchema.shape.email }}>
            {(field) => <AppField field={field} label="Email" type="email" placeholder="Enter your email" disabled={!!email} />}
          </form.Field>

          <form.Field name="otp" validators={{ onChange: resetPasswordZodSchema.shape.otp }}>
            {(field) => <AppField field={field} label="OTP Code" placeholder="6-digit code" />}
          </form.Field>

          <form.Field name="newPassword" validators={{ onChange: resetPasswordZodSchema.shape.newPassword }}>
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                append={
                  <Button type="button" onClick={() => setShowPassword((v) => !v)} variant="ghost" size="icon">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="confirmNewPassword"
            validators={{
              onChangeListenTo: ["newPassword"],
              onChange: ({ value, fieldApi }) =>
                value !== fieldApi.form.getFieldValue("newPassword") ? "Passwords do not match" : undefined,
            }}
          >
            {(field) => <AppField field={field} label="Confirm New Password" type="password" placeholder="Re-enter new password" />}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Resetting..." disabled={!canSubmit}>
                Reset Password
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
            Back to Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;

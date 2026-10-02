"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { changePasswordAction } from "@/app/(dashboardLayout)/(commonProtectedLayout)/change-password/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { changePasswordZodSchema, type IChangePasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const defaultValues: IChangePasswordPayload = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { mutateAsync, isPending } = useMutation({ mutationFn: changePasswordAction });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || "Failed to change password");
          return;
        }

        toast.success(result.message || "Password changed successfully");
        form.reset();
      } catch (error: any) {
        setServerError(`Failed to change password: ${error.message}`);
      }
    },
  });

  return (
    <Card className="w-full max-w-lg mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
        <CardDescription>Update your account password. You will need to know your current password.</CardDescription>
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
          <form.Field name="currentPassword" validators={{ onChange: changePasswordZodSchema.shape.currentPassword }}>
            {(field) => (
              <AppField
                field={field}
                label="Current Password"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                append={
                  <Button type="button" onClick={() => setShowCurrent((v) => !v)} variant="ghost" size="icon">
                    {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field name="newPassword" validators={{ onChange: changePasswordZodSchema.shape.newPassword }}>
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                append={
                  <Button type="button" onClick={() => setShowNew((v) => !v)} variant="ghost" size="icon">
                    {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
              <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Updating..." disabled={!canSubmit} className="w-auto">
                Update Password
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;

"use client"

import { createSpecialtyAction } from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  createSpecialtyFormZodSchema,
  type ICreateSpecialtyFormValues,
} from "@/zod/specialty.validation"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"

const defaultValues: ICreateSpecialtyFormValues = {
  title: "",
  icon: "",
}

const CreateSpecialtyFormModal = () => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSpecialtyAction,
  })

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const result = await mutateAsync(value)

      if (!result.success) {
        toast.error(result.message || "Failed to create specialty")
        return
      }

      toast.success(result.message || "Specialty created successfully")
      setOpen(false)
      form.reset()

      void queryClient.invalidateQueries({ queryKey: ["specialties"] })
      void queryClient.refetchQueries({ queryKey: ["specialties"], type: "active" })
    },
  })

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
      if (!nextOpen) {
        form.reset()
      }
    },
    [form],
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" className="ml-auto shrink-0">
          <Plus className="size-4" />
          Add Specialty
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Specialty</DialogTitle>
          <DialogDescription>Create a new medical specialty for doctors to be assigned to.</DialogDescription>
        </DialogHeader>

        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field name="title" validators={{ onChange: createSpecialtyFormZodSchema.shape.title }}>
            {(field) => <AppField field={field} label="Title" placeholder="e.g. Cardiology" />}
          </form.Field>

          <form.Field name="icon">
            {(field) => (
              <AppField
                field={field}
                label="Icon (optional)"
                placeholder="e.g. HeartPulse"
              />
            )}
          </form.Field>
          <p className="-mt-3 text-xs text-muted-foreground">
            Use a valid Lucide icon name (see lucide.dev/icons). Falls back to a default icon if left blank or invalid.
          </p>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <AppSubmitButton isPending={isPending} pendingLabel="Creating..." className="w-auto">
              Create Specialty
            </AppSubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSpecialtyFormModal

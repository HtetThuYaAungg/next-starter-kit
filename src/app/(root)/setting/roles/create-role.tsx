"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PermissionTree from "@/components/permission-tree";
import roleCreateSchema, { RoleFormValues } from "./schema/create-role";
import { useCreateRole, useUpdateRole } from "@/api-config/queries/role";
import { filterCheckedPermissions } from "@/helper/permission-check";
import { initialPermissions } from "@/lib/constants";
import { useMessage } from "@/app/contexts/MessageContext";
import Modal from "@/components/modal";
import BottomBtns from "@/components/modal_bottom_btns";
import { TextInput } from "@/components/form-inputs/text-input";

interface RoleCreationFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideDefaultTrigger?: boolean;
  onSuccess?: () => void;
  editedData?: RoleFormValues | null;
}

const defaultValues: RoleFormValues = {
  role_name: "",
  role_code: "",
  permissions: [],
};

export default function CreateRole({
  open,
  onOpenChange,
  hideDefaultTrigger,
  onSuccess,
  editedData,
}: RoleCreationFormProps) {
  const message = useMessage();

  const { mutateAsync: mutateAsyncCreateRole, isPending: isPendingCreateRole } =
    useCreateRole();
  const { mutateAsync: mutateAsyncUpdateRole, isPending: isPendingUpdateRole } =
    useUpdateRole();
  const formId = "role-form";

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleCreateSchema),
    defaultValues: defaultValues,
  });

  const handleClose = async () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  const onSubmit = async (data: RoleFormValues) => {
    const filteredPermissions = filterCheckedPermissions(data.permissions);
    const formData = {
      ...data,
      permissions: filteredPermissions,
    };
    const loadingId = message.loading(
      data.id ? "Editing..." : "Creating...",
      0
    );
    const isEdit = Boolean(formData.id);
    try {
      await (isEdit
        ? mutateAsyncUpdateRole(formData)
        : mutateAsyncCreateRole(formData));
      message.remove(loadingId);
      message.success(
        isEdit ? "Update role successful!" : "Create role successful!"
      );
      form.reset();
      handleClose();
    } catch (error: any) {
      message.remove(loadingId);
      message.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    if (editedData) {
      form.reset(editedData);
    } else {
      form.reset(defaultValues);
    }
  }, [editedData, form]);

  return (
    <Modal
      title={`${editedData ? "Edit Role" : "Create New Role"}`}
      description={`${
        editedData
          ? "Edit existing role ..."
          : "Create new role for the admin portal"
      }`}
      triggerButton={
        <Button className="gap-2">
          <PlusCircle className="h-3 w-3" />
          Create Role
        </Button>
      }
      width="lg"
      onClose={() => form.reset()}
      open={open}
      onOpenChange={onOpenChange}
      hideDefaultTrigger={hideDefaultTrigger}
      bottomButton={
        <BottomBtns
          isPending={isPendingCreateRole || isPendingUpdateRole}
          formId={formId}
          form={form}
          editedData={!!editedData}
        />
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 pt-0.5 py-2"
          id={formId}
        >
          <TextInput
            label="Role Code"
            name="role_code"
            placeholder="Enter role code"
            form={form}
            withAsterisk
          />
          <TextInput
            label="Role Name"
            name="role_name"
            placeholder="Enter role name"
            form={form}
            withAsterisk
          />

          <FormField
            control={form.control}
            name="permissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissions</FormLabel>
                <FormControl>
                  <PermissionTree
                    defaultPermissions={initialPermissions}
                    name={field.name}
                    control={form.control}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  PlusCircle,
} from "lucide-react";
import {
  useGetRoleById,
} from "@/api-config/queries/role";
import { useMessage } from "@/app/contexts/MessageContext";
import { DetailsView } from "@/components/details/detail-view";
import { RoleDetailsRenderer } from "./components/role-detail-render";
import Modal from "@/components/modal";

interface UserDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideDefaultTrigger?: boolean;
  onSuccess?: () => void;
  userId: number | null;
}

export default function DetailsRole({
  open,
  onOpenChange,
  hideDefaultTrigger,
  userId,
}: UserDetailsProps) {
  const message = useMessage();

  const {
    data: role,
    isLoading: isLoadingRole,
    isError,
  } = useGetRoleById(userId);

  return (
    <Modal
      title="Role Details"
      description="Details for a role"
      triggerButton={
        <Button className="gap-2">
          <PlusCircle className="h-3 w-3" />
          Details Role
        </Button>
      }
      open={open}
      onOpenChange={onOpenChange}
      hideDefaultTrigger={hideDefaultTrigger}
    >
      <DetailsView
        id={userId}
        data={role?.data}
        isLoading={isLoadingRole}
        isError={isError}
        render={(data) => <RoleDetailsRenderer data={data} />}
      />
    </Modal>
  );
}

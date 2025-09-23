"use client";

import type { Row } from "@tanstack/react-table";
import {
  Copy,
  ExternalLink,
  Loader,
  MoreHorizontal,
  Pen,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMessage } from "@/app/contexts/MessageContext";
import { useState } from "react";
import { RoleFormValues } from "../schema/create-role";
import { Role } from "@/api-config/services/role";
import { useDeleteRole } from "@/api-config/queries/role";
import CreateRole from "../create-role";
import DetailsRole from "../detail-role";
import { RouteGuard } from "@/components/route-guard";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RoleTableActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const role = row.original as Role;

  const message = useMessage();
  const { mutateAsync: mutateAsyncDeleteRole, isPending: isPendingDeleteRole } =
    useDeleteRole();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [roleData, setRoleData] = useState<RoleFormValues | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [roleId, setRoleId] = useState<number | null>(null);

  const handleCloseEditRole = () => {
    setIsDrawerOpen(false);
  };

  const handleCloseDetailsRole = () => {
    setIsDetailsDrawerOpen(false);
  };

  const handleEditRole = (role: Role) => {
    setRoleData({
      id: role.id,
      role_code: role.role_code,
      role_name: role.role_name,
      permissions: role.permissions,
    });
    setIsDrawerOpen(true);
  };

  const handleDetailRole = (roleId: number) => {
    setRoleId(roleId);
    setIsDetailsDrawerOpen(true);
  };

  const handleDeleteRole = async (id: number) => {
    const loadingId = message.loading("Deleting...", 0);
    try {
      await mutateAsyncDeleteRole(id);
      message.remove(loadingId);
      message.success("Delete role successful!");
    } catch (error: any) {
      message.remove(loadingId);
      message.error(error?.response.data.message);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(role.role_code)}
          >
            <Copy className="mr-2 h-4 w-4 text-gray-500" />
            Copy Role Code
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(role.role_name)}
          >
            <Copy className="mr-2 h-4 w-4 text-gray-500" />
            Copy Role Name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <RouteGuard permissionType="read">
            <DropdownMenuItem onClick={() => handleDetailRole(role.id)}>
              <ExternalLink className="mr-2 h-4 w-4 text-blue-500" />
              View Details
            </DropdownMenuItem>
          </RouteGuard>
          <RouteGuard permissionType="edit">
            <DropdownMenuItem
              onClick={() => handleEditRole(role)}
              disabled={role.role_code === "SYS_ADMIN"}
            >
              <Pen className="mr-2 h-4 w-4 text-yellow-500" />
              Edit
            </DropdownMenuItem>
          </RouteGuard>
          <RouteGuard permissionType="delete">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              disabled={role.role_code === "SYS_ADMIN"}
              onClick={() => handleDeleteRole(role.id)}
            >
              {isPendingDeleteRole ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4 text-red-500" />
              )}
              Delete
            </DropdownMenuItem>
          </RouteGuard>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateRole
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        hideDefaultTrigger={true}
        editedData={roleData}
        onSuccess={handleCloseEditRole}
      />
      {isDetailsDrawerOpen && (
        <DetailsRole
          open={isDetailsDrawerOpen}
          onOpenChange={setIsDetailsDrawerOpen}
          hideDefaultTrigger={true}
          userId={roleId}
          onSuccess={handleCloseDetailsRole}
        />
      )}
    </>
  );
}

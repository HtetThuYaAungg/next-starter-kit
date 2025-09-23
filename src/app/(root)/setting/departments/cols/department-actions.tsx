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
import { RouteGuard } from "@/components/route-guard";
import { useDeleteDepartment } from "@/api-config/queries/department";
import { Department } from "@/api-config/services/department";
import { DepartmentFormValues } from "../schema/create-department";
import CreateDepartment from "../create-department";
import DetailsDepartment from "../detail-department";

interface DataTableDepartmentActionsProps<TData> {
  row: Row<TData>;
}

export function DepartmentTableActions<TData>({
  row,
}: DataTableDepartmentActionsProps<TData>) {
  const department = row.original as Department;

  const message = useMessage();
  const {
    mutateAsync: mutateAsyncDeleteDepartment,
    isPending: isPendingDeleteDepartment,
  } = useDeleteDepartment();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [roleData, setRoleData] = useState<DepartmentFormValues | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState<number | null>(null);

  const handleCloseEditDepartment = () => {
    setIsDrawerOpen(false);
  };

  const handleCloseDetailsDepartment = () => {
    setIsDetailsDrawerOpen(false);
  };

  const handleEditDepartment = (department: Department) => {
    setRoleData({
      id: department.id,
      department_code: department.department_code,
      department_name: department.department_name,
    });
    setIsDrawerOpen(true);
  };

  const handleDetailRole = (departmentId: number) => {
    setDepartmentId(departmentId);
    setIsDetailsDrawerOpen(true);
  };

  const handleDeleteDepartment = async (id: number) => {
    const loadingId = message.loading("Deleting...", 0);
    try {
      await mutateAsyncDeleteDepartment(id);
      message.remove(loadingId);
      message.success("Delete department successful!");
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
            onClick={() =>
              navigator.clipboard.writeText(department.department_code)
            }
          >
            <Copy className="mr-2 h-4 w-4 text-gray-500" />
            Copy Department Code
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(department.department_name)
            }
          >
            <Copy className="mr-2 h-4 w-4 text-gray-500" />
            Copy Department Name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <RouteGuard permissionType="read">
            <DropdownMenuItem onClick={() => handleDetailRole(department.id)}>
              <ExternalLink className="mr-2 h-4 w-4 text-blue-500" />
              View Details
            </DropdownMenuItem>
          </RouteGuard>
          <RouteGuard permissionType="edit">
            <DropdownMenuItem
              onClick={() => handleEditDepartment(department)}
              disabled={department.department_code === "SYS"}
            >
              <Pen className="mr-2 h-4 w-4 text-yellow-500" />
              Edit
            </DropdownMenuItem>
          </RouteGuard>
          <RouteGuard permissionType="delete">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              disabled={department.department_code === "SYS"}
              onClick={() => handleDeleteDepartment(department.id)}
            >
              {isPendingDeleteDepartment ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4 text-red-500" />
              )}
              Delete
            </DropdownMenuItem>
          </RouteGuard>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateDepartment
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        hideDefaultTrigger={true}
        editedData={roleData}
        onSuccess={handleCloseEditDepartment}
      />
      {isDetailsDrawerOpen && (
        <DetailsDepartment
          open={isDetailsDrawerOpen}
          onOpenChange={setIsDetailsDrawerOpen}
          hideDefaultTrigger={true}
          departmentId={departmentId}
          onSuccess={handleCloseDetailsDepartment}
        />
      )}
    </>
  );
}

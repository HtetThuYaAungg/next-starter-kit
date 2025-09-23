import { Department } from "@/api-config/services/department";
import { UniversalDetailsRenderer } from "@/components/details/detail-renderer";


interface DepartmentDetailsRendererProps {
  data: Department;
  customRenderers?: Record<string, (value: any) => React.ReactNode>;
}

export function DepartmentDetailsRenderer({
  data,
  customRenderers,
}: DepartmentDetailsRendererProps) {
  return (
    <UniversalDetailsRenderer
      data={{
        ...data,
        "Created By": data.created_by?.full_name,
        "Created Date": data.created_at,
        "Updated Date": data.updated_at,
      }}
      excludeFields={[
        "id",
        "updated_by_id",
        "created_by_id",
        "created_at",
        "updated_at",
        "deleted_at",
        "created_by",
        "updated_by",
      ]}
      customRenderers={{
        created_at: (value) => new Date(value).toLocaleDateString(),
        updated_at: (value) => new Date(value).toLocaleString(),
        ...customRenderers,
      }}
    />
  );
}

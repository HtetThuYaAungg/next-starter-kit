export const permissionKey = {
  all: ["user-permission"] as const,
  userPermission : ["permission"] as const,
  detail: (id: string) => [...permissionKey.all, id] as const,
};

export const userKey = {
  all: ["user"] as const,
  profile: ["profile"] as const,
  detail: (id: number | null) => [...userKey.all, id] as const,
  filters: (filters: Record<string, string | number>) =>
    [...userKey.all, ...Object.values(filters)] as const,
};

export const departmentKey = {
  all: ["department"] as const,
  common: ["department-common"] as const,
  detail: (id: number | null) => [...departmentKey.all, id] as const,
  filters: (filters: Record<string, string | number>) =>
    [...departmentKey.all, ...Object.values(filters)] as const,
};

export const roleKey = {
  all: ["role"] as const,
  common: ["role-common"] as const,
  detail: (id: number | null) => [...roleKey.all, id] as const,
  filters: (filters: Record<string, string | number>) =>
    [...roleKey.all, ...Object.values(filters)] as const,
};

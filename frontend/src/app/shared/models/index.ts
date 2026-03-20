export interface User {
  id: string;
  username: string;
  email: string;
  userRoles?: UserRole[];
  created_at?: Date;
  updated_at?: Date;
}

export interface UserRole {
  user_id: string;
  role_id: string;
  role?: Role;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  roleEntitlements?: RoleEntitlement[];
  created_at?: Date;
  updated_at?: Date;
}

export interface RoleEntitlement {
  role_id: string;
  entitlement_id: string;
  entitlement?: Entitlement;
}

export interface Entitlement {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

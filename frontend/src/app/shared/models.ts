export interface User {
  id: string;
  username: string;
  email: string;
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
  userRoles?: UserRole[];
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  roleEntitlements?: RoleEntitlement[];
  userRoles?: UserRole[];
}

export interface Entitlement {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  roleEntitlements?: RoleEntitlement[];
}

export interface UserRole {
  user_id: string;
  role_id: string;
  user?: User;
  role?: Role;
}

export interface RoleEntitlement {
  role_id: string;
  entitlement_id: string;
  role?: Role;
  entitlement?: Entitlement;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  DEPARTMENT_MANAGER = 'department_manager',
  TEAM_LEADER = 'team_leader',
  MEMBER = 'member',
  GUEST = 'guest',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  departmentId?: string;
  position?: string;
  lastLoginAt?: Date;
  loginCount: number;
  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
  departmentId?: string;
  position?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: TokenResponse;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  avatar?: string;
  position?: string;
  bio?: string;
  preferences?: Record<string, any>;
}
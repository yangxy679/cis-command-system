import { UserRole } from '../entities/user.entity';

export interface JwtPayload {
  sub: string; // 用户ID
  email: string;
  username: string;
  role: UserRole;
  iat?: number; // 签发时间
  exp?: number; // 过期时间
}

export interface RefreshTokenPayload {
  sub: string; // 用户ID
  iat?: number;
  exp?: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    fullName?: string;
    role: UserRole;
    status: string;
    avatar?: string;
    departmentId?: string;
    position?: string;
    lastLoginAt?: Date;
    loginCount: number;
    createdAt: Date;
    updatedAt: Date;
  };
  tokens: TokenResponse;
}
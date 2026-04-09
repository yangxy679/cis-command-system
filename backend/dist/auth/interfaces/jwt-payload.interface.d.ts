import { UserRole } from '../entities/user.entity';
export interface JwtPayload {
    sub: string;
    email: string;
    username: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}
export interface RefreshTokenPayload {
    sub: string;
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

export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    DELETED = "deleted"
}
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    INSTRUCTOR = "instructor",
    DEPARTMENT_MANAGER = "department_manager",
    TEAM_LEADER = "team_leader",
    MEMBER = "member",
    GUEST = "guest"
}
export declare class User {
    id: string;
    email: string;
    username: string;
    password: string;
    fullName: string;
    phone: string;
    role: UserRole;
    status: UserStatus;
    avatar: string;
    departmentId: string;
    position: string;
    lastLoginAt: Date;
    lastLoginIp: string;
    loginCount: number;
    emailVerifiedAt: Date;
    phoneVerifiedAt: Date;
    preferences: Record<string, any>;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    isActive(): boolean;
    isSuperAdmin(): boolean;
    isAdmin(): boolean;
    isInstructor(): boolean;
    isManager(): boolean;
    canManageUser(targetUser: User): boolean;
    toJSON(): Omit<this, "password" | "hashPassword" | "validatePassword" | "isActive" | "isSuperAdmin" | "isAdmin" | "isInstructor" | "isManager" | "canManageUser" | "toJSON">;
}

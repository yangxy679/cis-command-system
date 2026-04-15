export declare class UpdateUserDto {
    fullName?: string;
    email?: string;
    rank?: string;
    department?: string;
    position?: string;
    phone?: string;
    isActive?: boolean;
    preferences?: Record<string, any>;
    roleIds?: string[];
}
export declare class UpdateUserProfileDto {
    fullName?: string;
    email?: string;
    phone?: string;
    preferences?: Record<string, any>;
}
export declare class ChangeUserStatusDto {
    isActive: boolean;
    reason?: string;
}
export declare class AssignRolesDto {
    roleIds: string[];
}
export declare class UserQueryDto {
    search?: string;
    department?: string;
    isActive?: boolean;
    roleId?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

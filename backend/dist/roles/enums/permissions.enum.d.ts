export declare enum Permissions {
    USER_VIEW = "user:view",
    USER_CREATE = "user:create",
    USER_EDIT = "user:edit",
    USER_DELETE = "user:delete",
    USER_MANAGE_ROLES = "user:manage_roles",
    ROLE_VIEW = "role:view",
    ROLE_CREATE = "role:create",
    ROLE_EDIT = "role:edit",
    ROLE_DELETE = "role:delete",
    ROLE_MANAGE_PERMISSIONS = "role:manage_permissions",
    DASHBOARD_VIEW = "dashboard:view",
    DASHBOARD_MANAGE = "dashboard:manage",
    UNIT_VIEW = "unit:view",
    UNIT_CREATE = "unit:create",
    UNIT_EDIT = "unit:edit",
    UNIT_DELETE = "unit:delete",
    UNIT_DEPLOY = "unit:deploy",
    MISSION_VIEW = "mission:view",
    MISSION_CREATE = "mission:create",
    MISSION_EDIT = "mission:edit",
    MISSION_DELETE = "mission:delete",
    MISSION_ASSIGN = "mission:assign",
    REPORT_VIEW = "report:view",
    REPORT_CREATE = "report:create",
    REPORT_EXPORT = "report:export",
    SYSTEM_SETTINGS_VIEW = "system:settings_view",
    SYSTEM_SETTINGS_EDIT = "system:settings_edit",
    SYSTEM_LOGS_VIEW = "system:logs_view",
    SYSTEM_LOGS_MANAGE = "system:logs_manage",
    ADMIN_ALL = "admin:all",
    SUPER_ADMIN = "super_admin"
}
export declare const PermissionGroups: {
    USER_MANAGEMENT: Permissions[];
    ROLE_MANAGEMENT: Permissions[];
    DASHBOARD: Permissions[];
    UNIT_MANAGEMENT: Permissions[];
    MISSION_MANAGEMENT: Permissions[];
    REPORT_MANAGEMENT: Permissions[];
    SYSTEM_MANAGEMENT: Permissions[];
    ADMIN: Permissions[];
};
export declare const RolePermissions: {
    SUPER_ADMIN: Permissions[];
    ADMIN: Permissions[];
    COMMANDER: Permissions[];
    OPERATOR: Permissions[];
    OBSERVER: Permissions[];
    GUEST: Permissions[];
};

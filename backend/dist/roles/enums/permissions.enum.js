"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.PermissionGroups = exports.Permissions = void 0;
var Permissions;
(function (Permissions) {
    Permissions["USER_VIEW"] = "user:view";
    Permissions["USER_CREATE"] = "user:create";
    Permissions["USER_EDIT"] = "user:edit";
    Permissions["USER_DELETE"] = "user:delete";
    Permissions["USER_MANAGE_ROLES"] = "user:manage_roles";
    Permissions["ROLE_VIEW"] = "role:view";
    Permissions["ROLE_CREATE"] = "role:create";
    Permissions["ROLE_EDIT"] = "role:edit";
    Permissions["ROLE_DELETE"] = "role:delete";
    Permissions["ROLE_MANAGE_PERMISSIONS"] = "role:manage_permissions";
    Permissions["DASHBOARD_VIEW"] = "dashboard:view";
    Permissions["DASHBOARD_MANAGE"] = "dashboard:manage";
    Permissions["UNIT_VIEW"] = "unit:view";
    Permissions["UNIT_CREATE"] = "unit:create";
    Permissions["UNIT_EDIT"] = "unit:edit";
    Permissions["UNIT_DELETE"] = "unit:delete";
    Permissions["UNIT_DEPLOY"] = "unit:deploy";
    Permissions["MISSION_VIEW"] = "mission:view";
    Permissions["MISSION_CREATE"] = "mission:create";
    Permissions["MISSION_EDIT"] = "mission:edit";
    Permissions["MISSION_DELETE"] = "mission:delete";
    Permissions["MISSION_ASSIGN"] = "mission:assign";
    Permissions["REPORT_VIEW"] = "report:view";
    Permissions["REPORT_CREATE"] = "report:create";
    Permissions["REPORT_EXPORT"] = "report:export";
    Permissions["SYSTEM_SETTINGS_VIEW"] = "system:settings_view";
    Permissions["SYSTEM_SETTINGS_EDIT"] = "system:settings_edit";
    Permissions["SYSTEM_LOGS_VIEW"] = "system:logs_view";
    Permissions["SYSTEM_LOGS_MANAGE"] = "system:logs_manage";
    Permissions["ADMIN_ALL"] = "admin:all";
    Permissions["SUPER_ADMIN"] = "super_admin";
})(Permissions || (exports.Permissions = Permissions = {}));
exports.PermissionGroups = {
    USER_MANAGEMENT: [
        Permissions.USER_VIEW,
        Permissions.USER_CREATE,
        Permissions.USER_EDIT,
        Permissions.USER_DELETE,
        Permissions.USER_MANAGE_ROLES,
    ],
    ROLE_MANAGEMENT: [
        Permissions.ROLE_VIEW,
        Permissions.ROLE_CREATE,
        Permissions.ROLE_EDIT,
        Permissions.ROLE_DELETE,
        Permissions.ROLE_MANAGE_PERMISSIONS,
    ],
    DASHBOARD: [
        Permissions.DASHBOARD_VIEW,
        Permissions.DASHBOARD_MANAGE,
    ],
    UNIT_MANAGEMENT: [
        Permissions.UNIT_VIEW,
        Permissions.UNIT_CREATE,
        Permissions.UNIT_EDIT,
        Permissions.UNIT_DELETE,
        Permissions.UNIT_DEPLOY,
    ],
    MISSION_MANAGEMENT: [
        Permissions.MISSION_VIEW,
        Permissions.MISSION_CREATE,
        Permissions.MISSION_EDIT,
        Permissions.MISSION_DELETE,
        Permissions.MISSION_ASSIGN,
    ],
    REPORT_MANAGEMENT: [
        Permissions.REPORT_VIEW,
        Permissions.REPORT_CREATE,
        Permissions.REPORT_EXPORT,
    ],
    SYSTEM_MANAGEMENT: [
        Permissions.SYSTEM_SETTINGS_VIEW,
        Permissions.SYSTEM_SETTINGS_EDIT,
        Permissions.SYSTEM_LOGS_VIEW,
        Permissions.SYSTEM_LOGS_MANAGE,
    ],
    ADMIN: [
        Permissions.ADMIN_ALL,
        Permissions.SUPER_ADMIN,
    ],
};
exports.RolePermissions = {
    SUPER_ADMIN: Object.values(Permissions),
    ADMIN: [
        ...exports.PermissionGroups.USER_MANAGEMENT,
        ...exports.PermissionGroups.ROLE_MANAGEMENT,
        ...exports.PermissionGroups.DASHBOARD,
        ...exports.PermissionGroups.UNIT_MANAGEMENT,
        ...exports.PermissionGroups.MISSION_MANAGEMENT,
        ...exports.PermissionGroups.REPORT_MANAGEMENT,
        ...exports.PermissionGroups.SYSTEM_MANAGEMENT,
    ],
    COMMANDER: [
        Permissions.DASHBOARD_VIEW,
        Permissions.UNIT_VIEW,
        Permissions.UNIT_DEPLOY,
        Permissions.MISSION_VIEW,
        Permissions.MISSION_CREATE,
        Permissions.MISSION_ASSIGN,
        Permissions.REPORT_VIEW,
    ],
    OPERATOR: [
        Permissions.DASHBOARD_VIEW,
        Permissions.UNIT_VIEW,
        Permissions.MISSION_VIEW,
        Permissions.REPORT_VIEW,
    ],
    OBSERVER: [
        Permissions.DASHBOARD_VIEW,
        Permissions.UNIT_VIEW,
        Permissions.MISSION_VIEW,
    ],
    GUEST: [
        Permissions.DASHBOARD_VIEW,
    ],
};
//# sourceMappingURL=permissions.enum.js.map
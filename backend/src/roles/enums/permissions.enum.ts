export enum Permissions {
  // 用户管理权限
  USER_VIEW = 'user:view',
  USER_CREATE = 'user:create',
  USER_EDIT = 'user:edit',
  USER_DELETE = 'user:delete',
  USER_MANAGE_ROLES = 'user:manage_roles',

  // 角色管理权限
  ROLE_VIEW = 'role:view',
  ROLE_CREATE = 'role:create',
  ROLE_EDIT = 'role:edit',
  ROLE_DELETE = 'role:delete',
  ROLE_MANAGE_PERMISSIONS = 'role:manage_permissions',

  // 仪表板权限
  DASHBOARD_VIEW = 'dashboard:view',
  DASHBOARD_MANAGE = 'dashboard:manage',

  // 作战单位权限
  UNIT_VIEW = 'unit:view',
  UNIT_CREATE = 'unit:create',
  UNIT_EDIT = 'unit:edit',
  UNIT_DELETE = 'unit:delete',
  UNIT_DEPLOY = 'unit:deploy',

  // 任务管理权限
  MISSION_VIEW = 'mission:view',
  MISSION_CREATE = 'mission:create',
  MISSION_EDIT = 'mission:edit',
  MISSION_DELETE = 'mission:delete',
  MISSION_ASSIGN = 'mission:assign',

  // 报表权限
  REPORT_VIEW = 'report:view',
  REPORT_CREATE = 'report:create',
  REPORT_EXPORT = 'report:export',

  // 系统设置权限
  SYSTEM_SETTINGS_VIEW = 'system:settings_view',
  SYSTEM_SETTINGS_EDIT = 'system:settings_edit',
  SYSTEM_LOGS_VIEW = 'system:logs_view',
  SYSTEM_LOGS_MANAGE = 'system:logs_manage',

  // 高级权限
  ADMIN_ALL = 'admin:all',
  SUPER_ADMIN = 'super_admin',
}

// 权限分组
export const PermissionGroups = {
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

// 预定义角色权限
export const RolePermissions = {
  SUPER_ADMIN: Object.values(Permissions),
  ADMIN: [
    ...PermissionGroups.USER_MANAGEMENT,
    ...PermissionGroups.ROLE_MANAGEMENT,
    ...PermissionGroups.DASHBOARD,
    ...PermissionGroups.UNIT_MANAGEMENT,
    ...PermissionGroups.MISSION_MANAGEMENT,
    ...PermissionGroups.REPORT_MANAGEMENT,
    ...PermissionGroups.SYSTEM_MANAGEMENT,
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

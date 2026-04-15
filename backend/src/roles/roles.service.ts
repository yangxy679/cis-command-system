import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permissions, RolePermissions } from './enums/permissions.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll(query: any) {
    const {
      search,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.name = Like(`%${search}%`);
    }

    const [roles, total] = await this.rolesRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    return {
      data: roles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const role = await this.rolesRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!role) {
      throw new NotFoundException(`角色 ${id} 不存在`);
    }

    return role;
  }

  async findByName(name: string) {
    return this.rolesRepository.findOne({
      where: { name },
    });
  }

  async create(createRoleDto: any) {
    const { name, description, permissions, isActive = true } = createRoleDto;

    // 检查角色名是否已存在
    const existingRole = await this.rolesRepository.findOne({
      where: { name },
    });

    if (existingRole) {
      throw new BadRequestException('角色名已存在');
    }

    // 验证权限
    const validPermissions = this.validatePermissions(permissions);

    const role = this.rolesRepository.create({
      name,
      description,
      permissions: validPermissions,
      isActive,
      isSystem: false,
      priority: 100,
    });

    return this.rolesRepository.save(role);
  }

  async update(id: string, updateRoleDto: any) {
    const role = await this.findOne(id);

    // 系统角色不能修改
    if (role.isSystem) {
      throw new BadRequestException('系统角色不能修改');
    }

    if (updateRoleDto.name !== undefined && updateRoleDto.name !== role.name) {
      // 检查新角色名是否被其他角色使用
      const existingRole = await this.rolesRepository.findOne({
        where: { name: updateRoleDto.name },
      });

      if (existingRole && existingRole.id !== id) {
        throw new BadRequestException('角色名已被其他角色使用');
      }
      role.name = updateRoleDto.name;
    }

    if (updateRoleDto.description !== undefined) role.description = updateRoleDto.description;
    if (updateRoleDto.isActive !== undefined) role.isActive = updateRoleDto.isActive;
    if (updateRoleDto.priority !== undefined) role.priority = updateRoleDto.priority;

    // 更新权限
    if (updateRoleDto.permissions !== undefined) {
      role.permissions = this.validatePermissions(updateRoleDto.permissions);
    }

    return this.rolesRepository.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);

    // 系统角色不能删除
    if (role.isSystem) {
      throw new BadRequestException('系统角色不能删除');
    }

    // 检查是否有用户使用该角色
    if (role.users && role.users.length > 0) {
      throw new BadRequestException('该角色已被用户使用，不能删除');
    }

    return this.rolesRepository.remove(role);
  }

  async getStatistics() {
    const totalRoles = await this.rolesRepository.count();
    const activeRoles = await this.rolesRepository.count({ where: { isActive: true } });
    const systemRoles = await this.rolesRepository.count({ where: { isSystem: true } });

    return {
      total: totalRoles,
      active: activeRoles,
      system: systemRoles,
      custom: totalRoles - systemRoles,
    };
  }

  async initializeSystemRoles() {
    const systemRoles = [
      {
        name: 'SUPER_ADMIN',
        description: '超级管理员',
        permissions: RolePermissions.SUPER_ADMIN,
        isSystem: true,
        priority: 1,
      },
      {
        name: 'ADMIN',
        description: '管理员',
        permissions: RolePermissions.ADMIN,
        isSystem: true,
        priority: 10,
      },
      {
        name: 'COMMANDER',
        description: '指挥员',
        permissions: RolePermissions.COMMANDER,
        isSystem: true,
        priority: 20,
      },
      {
        name: 'OPERATOR',
        description: '操作员',
        permissions: RolePermissions.OPERATOR,
        isSystem: true,
        priority: 30,
      },
      {
        name: 'OBSERVER',
        description: '观察员',
        permissions: RolePermissions.OBSERVER,
        isSystem: true,
        priority: 40,
      },
      {
        name: 'GUEST',
        description: '访客',
        permissions: RolePermissions.GUEST,
        isSystem: true,
        priority: 50,
      },
    ];

    for (const roleData of systemRoles) {
      const existingRole = await this.findByName(roleData.name);
      if (!existingRole) {
        const role = this.rolesRepository.create(roleData);
        await this.rolesRepository.save(role);
      }
    }

    return { message: '系统角色初始化完成' };
  }

  // 验证权限列表
  private validatePermissions(permissions: string[]): string[] {
    if (!permissions || !Array.isArray(permissions)) {
      return [];
    }

    // 获取所有有效权限
    const allPermissions = Object.values(Permissions);
    
    // 过滤无效权限
    return permissions.filter(permission => 
      allPermissions.includes(permission as Permissions)
    );
  }

  // 获取所有权限列表
  getAllPermissions() {
    return {
      permissions: Object.values(Permissions),
      groups: PermissionGroups,
      rolePermissions: RolePermissions,
    };
  }

  // 检查角色是否有特定权限
  async hasPermission(roleId: string, permission: string): Promise<boolean> {
    const role = await this.findOne(roleId);
    return role.hasPermission(permission);
  }

  // 为角色添加权限
  async addPermission(roleId: string, permission: string) {
    const role = await this.findOne(roleId);
    
    if (role.isSystem) {
      throw new BadRequestException('系统角色的权限不能修改');
    }

    // 验证权限是否有效
    const allPermissions = Object.values(Permissions);
    if (!allPermissions.includes(permission as Permissions)) {
      throw new BadRequestException(`无效的权限: ${permission}`);
    }

    role.addPermission(permission);
    return this.rolesRepository.save(role);
  }

  // 从角色移除权限
  async removePermission(roleId: string, permission: string) {
    const role = await this.findOne(roleId);
    
    if (role.isSystem) {
      throw new BadRequestException('系统角色的权限不能修改');
    }

    role.removePermission(permission);
    return this.rolesRepository.save(role);
  }
}

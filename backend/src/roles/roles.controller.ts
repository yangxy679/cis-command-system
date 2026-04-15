import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiQuery
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '获取角色列表' })
  @ApiQuery({ name: 'search', required: false, description: '搜索关键词' })
  @ApiQuery({ name: 'page', required: false, description: '页码', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量', type: Number })
  @ApiQuery({ name: 'sortBy', required: false, description: '排序字段' })
  @ApiQuery({ name: 'sortOrder', required: false, description: '排序方向', enum: ['ASC', 'DESC'] })
  @ApiResponse({ status: 200, description: '返回角色列表' })
  @ApiResponse({ status: 401, description: '未授权访问' })
  @ApiResponse({ status: 403, description: '权限不足' })
  async findAll(@Query() query: any) {
    return this.rolesService.findAll(query);
  }

  @Get('statistics')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '获取角色统计信息' })
  @ApiResponse({ status: 200, description: '返回角色统计信息' })
  async getStatistics() {
    return this.rolesService.getStatistics();
  }

  @Get('permissions')
  @ApiOperation({ summary: '获取所有权限列表' })
  @ApiResponse({ status: 200, description: '返回权限列表' })
  async getAllPermissions() {
    return this.rolesService.getAllPermissions();
  }

  @Get('initialize-system')
  @Roles('super_admin')
  @ApiOperation({ summary: '初始化系统角色' })
  @ApiResponse({ status: 200, description: '系统角色初始化完成' })
  @ApiResponse({ status: 403, description: '需要超级管理员权限' })
  async initializeSystemRoles() {
    return this.rolesService.initializeSystemRoles();
  }

  @Get(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '获取角色详情' })
  @ApiResponse({ status: 200, description: '返回角色详情' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.findOne(id);
  }

  @Post()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '创建角色' })
  @ApiResponse({ status: 201, description: '角色创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '角色名已存在' })
  async create(@Body() createRoleDto: any) {
    return this.rolesService.create(createRoleDto);
  }

  @Put(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '更新角色信息' })
  @ApiResponse({ status: 200, description: '角色更新成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: any,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Put(':id/permissions/add')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '为角色添加权限' })
  @ApiResponse({ status: 200, description: '权限添加成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @ApiResponse({ status: 400, description: '无效的权限' })
  async addPermission(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('permission') permission: string,
  ) {
    return this.rolesService.addPermission(id, permission);
  }

  @Put(':id/permissions/remove')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '从角色移除权限' })
  @ApiResponse({ status: 200, description: '权限移除成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  async removePermission(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('permission') permission: string,
  ) {
    return this.rolesService.removePermission(id, permission);
  }

  @Delete(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: '删除角色' })
  @ApiResponse({ status: 200, description: '角色删除成功' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  @ApiResponse({ status: 400, description: '系统角色不能删除或角色已被使用' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.remove(id);
  }

  @Get(':id/has-permission/:permission')
  @ApiOperation({ summary: '检查角色是否有特定权限' })
  @ApiResponse({ status: 200, description: '返回检查结果' })
  @ApiResponse({ status: 404, description: '角色不存在' })
  async hasPermission(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('permission') permission: string,
  ) {
    const hasPermission = await this.rolesService.hasPermission(id, permission);
    return { hasPermission };
  }
}

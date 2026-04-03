import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.COMMANDER)
  @ApiOperation({ summary: '创建新用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.COMMANDER, UserRole.OFFICER)
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResponse({ status: 200, description: '返回用户列表' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('department') department?: string,
    @Query('rank') rank?: string,
    @Query('status') status?: string,
  ) {
    return this.usersService.findAll({
      page,
      limit,
      department,
      rank,
      status,
    });
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.COMMANDER, UserRole.OFFICER)
  @ApiOperation({ summary: '获取用户详情' })
  @ApiResponse({ status: 200, description: '返回用户信息' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.COMMANDER)
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户更新成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/activate')
  @Roles(UserRole.ADMIN, UserRole.COMMANDER)
  @ApiOperation({ summary: '激活用户' })
  @ApiResponse({ status: 200, description: '用户激活成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  activate(@Param('id') id: string) {
    return this.usersService.activate(+id);
  }

  @Post(':id/deactivate')
  @Roles(UserRole.ADMIN, UserRole.COMMANDER)
  @ApiOperation({ summary: '停用用户' })
  @ApiResponse({ status: 200, description: '用户停用成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(+id);
  }

  @Get(':id/permissions')
  @Roles(UserRole.ADMIN, UserRole.COMMANDER, UserRole.OFFICER)
  @ApiOperation({ summary: '获取用户权限' })
  @ApiResponse({ status: 200, description: '返回用户权限列表' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getPermissions(@Param('id') id: string) {
    return this.usersService.getPermissions(+id);
  }

  @Get('search/:keyword')
  @Roles(UserRole.ADMIN, UserRole.COMMANDER, UserRole.OFFICER)
  @ApiOperation({ summary: '搜索用户' })
  @ApiResponse({ status: 200, description: '返回搜索结果' })
  search(@Param('keyword') keyword: string) {
    return this.usersService.search(keyword);
  }
}

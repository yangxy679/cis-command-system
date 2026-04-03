import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserRole, UserStatus } from '../../auth/entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({ description: '邮箱地址', example: 'zhang@command.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '密码', example: 'NewSecurePass123!', required: false })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiProperty({ description: '全名', example: '张指挥官', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: '部门', example: '作战指挥部', required: false })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ description: '军衔', example: '上校', required: false })
  @IsString()
  @IsOptional()
  rank?: string;

  @ApiProperty({ 
    description: '用户角色', 
    enum: UserRole,
    example: UserRole.COMMANDER,
    required: false 
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ 
    description: '用户状态', 
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    required: false 
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiProperty({ description: '联系电话', example: '13800138000', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '职位', example: '作战指挥官', required: false })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ description: '备注', example: '高级指挥官', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

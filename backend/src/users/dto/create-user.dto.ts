import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../auth/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'commander_zhang' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({ description: '邮箱地址', example: 'zhang@command.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '密码', example: 'SecurePass123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: '全名', example: '张指挥官' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: '部门', example: '作战指挥部' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ description: '军衔', example: '上校' })
  @IsString()
  @IsNotEmpty()
  rank: string;

  @ApiProperty({ 
    description: '用户角色', 
    enum: UserRole,
    example: UserRole.COMMANDER 
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

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

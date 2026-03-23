import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({
    description: '用户名',
    example: 'john_doe',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3, { message: '用户名至少3个字符' })
  @MaxLength(50, { message: '用户名最多50个字符' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: '用户名只能包含字母、数字和下划线',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'Password123!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: '密码至少8个字符' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: '密码必须包含大小写字母、数字和特殊字符',
  })
  password: string;

  @ApiProperty({
    description: '真实姓名',
    example: '张三',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '真实姓名最多50个字符' })
  fullName?: string;

  @ApiProperty({
    description: '手机号码',
    example: '13800138000',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号码格式不正确' })
  phone?: string;

  @ApiProperty({
    description: '部门ID',
    example: 'marketing',
    required: false,
  })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @ApiProperty({
    description: '职位',
    example: '前端工程师',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: '职位最多100个字符' })
  position?: string;
}
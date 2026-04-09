import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@example.com', description: '用户邮箱' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string;

  @ApiProperty({ example: 'username123', description: '用户名' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名至少3个字符' })
  @MaxLength(20, { message: '用户名最多20个字符' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: '用户名只能包含字母、数字和下划线' })
  username: string;

  @ApiProperty({ example: 'password123', description: '密码' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码至少6个字符' })
  @MaxLength(30, { message: '密码最多30个字符' })
  password: string;

  @ApiProperty({ example: '张三', description: '真实姓名', required: false })
  @IsOptional()
  @IsString({ message: '真实姓名必须是字符串' })
  @MaxLength(50, { message: '真实姓名最多50个字符' })
  fullName?: string;

  @ApiProperty({ example: '13800138000', description: '手机号码', required: false })
  @IsOptional()
  @IsString({ message: '手机号码必须是字符串' })
  @Matches(/^1[3-9]\d{9}$/, { message: '请输入有效的手机号码' })
  phone?: string;
}

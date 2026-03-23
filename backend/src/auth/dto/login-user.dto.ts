import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: '登录标识（邮箱或用户名）',
    example: 'user@example.com 或 john_doe',
  })
  @IsString({ message: '登录标识必须是字符串' })
  identifier: string;

  @ApiProperty({
    description: '密码',
    example: 'Password123!',
  })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @ApiProperty({
    description: '记住登录状态',
    example: true,
    required: false,
  })
  @IsOptional()
  rememberMe?: boolean;
}

export class LoginWithEmailDto {
  @ApiProperty({
    description: '邮箱',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({
    description: '密码',
    example: 'Password123!',
  })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @ApiProperty({
    description: '记住登录状态',
    example: true,
    required: false,
  })
  @IsOptional()
  rememberMe?: boolean;
}

export class LoginWithUsernameDto {
  @ApiProperty({
    description: '用户名',
    example: 'john_doe',
  })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'Password123!',
  })
  @IsString({ message: '密码必须是字符串' })
  password: string;

  @ApiProperty({
    description: '记住登录状态',
    example: true,
    required: false,
  })
  @IsOptional()
  rememberMe?: boolean;
}
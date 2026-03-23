import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: '真实姓名',
    example: '李四',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '真实姓名最多50个字符' })
  fullName?: string;

  @ApiProperty({
    description: '手机号码',
    example: '13900139000',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号码格式不正确' })
  phone?: string;

  @ApiProperty({
    description: '头像URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: '职位',
    example: '高级前端工程师',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: '职位最多100个字符' })
  position?: string;

  @ApiProperty({
    description: '个人简介',
    example: '专注于前端开发和用户体验',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: '个人简介最多500个字符' })
  bio?: string;

  @ApiProperty({
    description: '用户偏好设置（JSON格式）',
    example: { theme: 'dark', language: 'zh-CN' },
    required: false,
  })
  @IsOptional()
  preferences?: Record<string, any>;
}
import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
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

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: '头像URL', required: false })
  @IsOptional()
  @IsString({ message: '头像URL必须是字符串' })
  avatar?: string;

  @ApiProperty({ example: '技术部', description: '部门', required: false })
  @IsOptional()
  @IsString({ message: '部门必须是字符串' })
  @MaxLength(100, { message: '部门最多100个字符' })
  department?: string;

  @ApiProperty({ example: '高级工程师', description: '职位', required: false })
  @IsOptional()
  @IsString({ message: '职位必须是字符串' })
  @MaxLength(100, { message: '职位最多100个字符' })
  position?: string;
}

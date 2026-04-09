import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldpassword123', description: '旧密码' })
  @IsString({ message: '旧密码必须是字符串' })
  oldPassword: string;

  @ApiProperty({ example: 'newpassword123', description: '新密码' })
  @IsString({ message: '新密码必须是字符串' })
  @MinLength(6, { message: '新密码至少6个字符' })
  @MaxLength(30, { message: '新密码最多30个字符' })
  newPassword: string;

  @ApiProperty({ example: 'newpassword123', description: '确认新密码' })
  @IsString({ message: '确认新密码必须是字符串' })
  confirmNewPassword: string;
}

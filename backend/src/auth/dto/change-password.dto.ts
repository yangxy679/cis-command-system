import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: '旧密码',
    example: 'OldPassword123!',
  })
  @IsString({ message: '旧密码必须是字符串' })
  oldPassword: string;

  @ApiProperty({
    description: '新密码',
    example: 'NewPassword456!',
    minLength: 8,
  })
  @IsString({ message: '新密码必须是字符串' })
  @MinLength(8, { message: '新密码至少8个字符' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: '新密码必须包含大小写字母、数字和特殊字符',
  })
  newPassword: string;

  @ApiProperty({
    description: '确认新密码',
    example: 'NewPassword456!',
  })
  @IsString({ message: '确认密码必须是字符串' })
  confirmPassword: string;
}
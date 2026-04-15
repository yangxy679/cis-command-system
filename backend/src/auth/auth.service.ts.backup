import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload, TokenResponse } from './interfaces/jwt-payload.interface';

export interface AuthService {
  // 认证相关
  register(registerUserDto: RegisterUserDto): Promise<any>;
  login(loginUserDto: LoginUserDto): Promise<any>;
  refreshToken(refreshToken: string): Promise<TokenResponse>;
  validateUser(payload: JwtPayload): Promise<any>;
  logout(userId: string): Promise<void>;
  
  // 用户资料相关
  getProfile(userId: string): Promise<any>;
  updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<any>;
  changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<any>;
  
  // 工具方法
  findById(userId: string): Promise<any>;
}

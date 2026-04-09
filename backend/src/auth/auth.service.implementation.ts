import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { User, UserStatus, UserRole } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload, TokenResponse } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthServiceImplementation implements AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    // 检查邮箱是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('邮箱已被注册');
    }

    // 检查用户名是否已存在
    const existingUsername = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('用户名已被使用');
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    try {
      // 创建用户实体
      const user = this.userRepository.create({
        email: registerUserDto.email,
        username: registerUserDto.username,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        fullName: registerUserDto.fullName || '',
        phone: registerUserDto.phone || '',
      });

      const savedUser = await this.userRepository.save(user);

      // 移除密码字段返回
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException('注册失败: ' + error.message);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
        select: ['id', 'email', 'username', 'password', 'role', 'status', 'fullName'],
      });

      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }

      // 验证密码
      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('密码错误');
      }

      // 检查用户状态
      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('账户已被禁用');
      }

      // 生成JWT令牌
      const tokens = await this.generateTokens(user);

      // 更新最后登录时间
      await this.userRepository.update(user.id, {
        lastLoginAt: new Date(),
      });

      // 移除密码字段返回
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        tokens,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('登录失败: ' + error.message);
    }
  }

  private async generateTokens(user: User): Promise<TokenResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'cis-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'cis-refresh-secret-key',
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 3600, // 1小时
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'cis-refresh-secret-key',
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_SECRET || 'cis-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });

      return {
        accessToken: newAccessToken,
        refreshToken, // 返回原刷新令牌
        tokenType: 'Bearer',
        expiresIn: 3600,
      };
    } catch (error) {
      throw new UnauthorizedException('刷新令牌无效');
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async logout(userId: string): Promise<void> {
    // 在实际应用中，这里可以将令牌加入黑名单
    // 目前只是记录日志
    console.log(`用户 ${userId} 已登出`);
  }
}

  async getProfile(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<any> {
    await this.userRepository.update(userId, updateProfileDto);
    
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!updatedUser) {
      throw new UnauthorizedException('用户不存在');
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // 验证旧密码
    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new UnauthorizedException('旧密码错误');
    }

    // 验证新密码和确认密码是否一致
    if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword) {
      throw new BadRequestException('新密码和确认密码不一致');
    }

    // 哈希新密码
    const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    // 更新密码
    await this.userRepository.update(userId, {
      password: hashedNewPassword,
    });

    return { message: '密码修改成功' };
  }

  async findById(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

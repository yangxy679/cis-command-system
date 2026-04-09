import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户注册
   */
  async register(createUserDto: CreateUserDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    // 检查用户是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('用户已存在');
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 创建用户
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      status: 'active',
      lastLoginAt: null,
    });

    await this.userRepository.save(user);

    // 生成令牌
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * 用户登录
   */
  async login(loginUserDto: LoginUserDto): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    // 查找用户
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 检查用户状态
    if (user.status !== 'active') {
      throw new UnauthorizedException('用户账户已被禁用');
    }

    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    // 生成令牌
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * 生成访问令牌和刷新令牌
   */
  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_EXPIRATION || '7d',
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '30d',
      },
    );

    return { accessToken, refreshToken };
  }

  /**
   * 刷新访问令牌
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: process.env.JWT_EXPIRATION || '7d',
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('刷新令牌无效');
    }
  }

  /**
   * 获取用户信息
   */
  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return this.sanitizeUser(user);
  }

  /**
   * 更新用户信息
   */
  async updateUserProfile(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 更新用户信息
    Object.assign(user, updateData);
    await this.userRepository.save(user);

    return this.sanitizeUser(user);
  }

  /**
   * 清理用户敏感信息
   */
  private sanitizeUser(user: User): User {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser as User;
  }
}

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserStatus, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * 用户注册
   */
  async register(createUserDto: CreateUserDto): Promise<{
    user: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }> {
    // 检查邮箱是否已存在
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('该邮箱已被注册');
    }

    // 检查用户名是否已存在
    const existingUserByUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUserByUsername) {
      throw new ConflictException('该用户名已被使用');
    }

    // 创建用户
    const user = this.usersRepository.create(createUserDto);

    // 如果是第一个用户，设置为超级管理员
    const userCount = await this.usersRepository.count();
    if (userCount === 0) {
      user.role = UserRole.SUPER_ADMIN;
      user.status = UserStatus.ACTIVE;
    }

    // 保存用户
    const savedUser = await this.usersRepository.save(user);

    // 生成令牌
    const tokens = await this.generateTokens(savedUser);

    // 返回用户信息（排除密码）
    const { password, ...userWithoutPassword } = savedUser;
    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  /**
   * 用户登录
   */
  async login(loginDto: LoginUserDto): Promise<{
    user: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }> {
    // 查找用户（通过邮箱或用户名）
    const user = await this.findUserByIdentifier(loginDto.identifier);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 检查用户状态
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('账户已被禁用，请联系管理员');
    }

    // 验证密码
    const isValidPassword = await user.validatePassword(loginDto.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // 更新登录信息
    user.lastLoginAt = new Date();
    user.loginCount += 1;
    await this.usersRepository.save(user);

    // 生成令牌
    const tokens = await this.generateTokens(user);

    // 返回用户信息（排除密码）
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  /**
   * 通过标识符查找用户（邮箱或用户名）
   */
  private async findUserByIdentifier(identifier: string): Promise<User | null> {
    // 检查是否是邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(identifier)) {
      return this.usersRepository.findOne({
        where: { email: identifier },
      });
    }

    // 否则按用户名查找
    return this.usersRepository.findOne({
      where: { username: identifier },
    });
  }

  /**
   * 生成访问令牌和刷新令牌
   */
  private async generateTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES', '15m'),
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES', '7d'),
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  /**
   * 刷新访问令牌
   */
  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      // 验证刷新令牌
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      // 查找用户
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('用户不存在或已被禁用');
      }

      // 生成新的令牌对
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('刷新令牌无效或已过期');
    }
  }

  /**
   * 获取当前用户信息
   */
  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * 更新用户信息
   */
  async updateProfile(
    userId: string,
    updateData: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 不允许更新某些字段
    const { id, email, username, role, status, ...allowedUpdates } = updateData;

    // 更新用户信息
    Object.assign(user, allowedUpdates);
    const updatedUser = await this.usersRepository.save(user);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * 修改密码
   */
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 验证旧密码
    const isValidPassword = await user.validatePassword(oldPassword);
    if (!isValidPassword) {
      throw new BadRequestException('旧密码错误');
    }

    // 更新密码
    user.password = newPassword;
    await this.usersRepository.save(user);

    return { message: '密码修改成功' };
  }

  /**
   * 验证令牌
   */
  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('令牌无效或已过期');
    }
  }

  /**
   * 根据ID查找用户
   */
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * 根据邮箱查找用户
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * 根据用户名查找用户
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  /**
   * 获取所有用户（分页）
   */
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    users: Omit<User, 'password'>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      users: usersWithoutPassword,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceSimple {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  async register(username: string, password: string, email?: string, fullName?: string) {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new UnauthorizedException('用户名已存在');
    }

    // 检查邮箱是否已存在
    if (email) {
      const existingEmail = await this.userRepository.findOne({ where: { email } });
      if (existingEmail) {
        throw new UnauthorizedException('邮箱已存在');
      }
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      fullName,
      isActive: true,
    });

    await this.userRepository.save(user);

    // 返回登录token
    const { password: _, ...userWithoutPassword } = user;
    return this.login(userWithoutPassword);
  }
}

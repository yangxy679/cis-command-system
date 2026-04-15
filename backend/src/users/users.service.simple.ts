import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersServiceSimple {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: any) {
    const {
      search,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.username = Like(`%${search}%`);
    }

    const [users, total] = await this.usersRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`);
    }

    return user;
  }

  async create(createUserDto: any) {
    const { username, password, email, fullName } = createUserDto;

    // 检查用户名是否已存在
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    // 检查邮箱是否已存在
    if (email) {
      const existingEmail = await this.usersRepository.findOne({
        where: { email },
      });

      if (existingEmail) {
        throw new BadRequestException('邮箱已存在');
      }
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
      fullName,
    });

    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: any) {
    const user = await this.findOne(id);

    // 更新基本信息
    if (updateUserDto.email !== undefined) {
      // 检查邮箱是否被其他用户使用
      if (updateUserDto.email !== user.email) {
        const existingEmail = await this.usersRepository.findOne({
          where: { email: updateUserDto.email },
        });

        if (existingEmail && existingEmail.id !== id) {
          throw new BadRequestException('邮箱已被其他用户使用');
        }
      }
      user.email = updateUserDto.email;
    }

    if (updateUserDto.fullName !== undefined) user.fullName = updateUserDto.fullName;

    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async getStatistics() {
    const totalUsers = await this.usersRepository.count();
    
    return {
      total: totalUsers,
      active: totalUsers, // 简化：所有用户都算活跃
      verified: 0, // 简化：没有验证状态
      inactive: 0,
      departmentStats: [],
      recentRegistrations: 0,
    };
  }
}

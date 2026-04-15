import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole, UserStatus } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

interface FindAllOptions {
  page: number;
  limit: number;
  department?: string;
  rank?: string;
  status?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 检查用户名是否已存在
    const existingUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUsername) {
      throw new ConflictException('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('邮箱已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.userRepository.save(user);
  }

  async findAll(options: FindAllOptions): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const { page, limit, department, rank, status } = options;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<User> = {};
    
    if (department) {
      where.department = department;
    }
    
    if (rank) {
      where.rank = rank;
    }
    
    if (status) {
      where.status = status as UserStatus;
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['permissions'],
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!user) {
      throw new NotFoundException(`用户 ID ${id} 不存在`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // 如果更新邮箱，检查是否重复
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingEmail) {
        throw new ConflictException('邮箱已存在');
      }
    }

    // 如果更新密码，加密新密码
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    
    // 不能删除管理员账户
    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException('不能删除管理员账户');
    }

    await this.userRepository.remove(user);
  }

  async activate(id: number): Promise<User> {
    const user = await this.findOne(id);
    user.status = UserStatus.ACTIVE;
    user.updatedAt = new Date();
    return await this.userRepository.save(user);
  }

  async deactivate(id: number): Promise<User> {
    const user = await this.findOne(id);
    
    // 不能停用管理员账户
    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException('不能停用管理员账户');
    }

    user.status = UserStatus.INACTIVE;
    user.updatedAt = new Date();
    return await this.userRepository.save(user);
  }

  async getPermissions(id: number): Promise<string[]> {
    const user = await this.findOne(id);
    return user.permissions?.map(p => p.name) || [];
  }

  async search(keyword: string): Promise<User[]> {
    return await this.userRepository.find({
      where: [
        { username: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) },
        { fullName: Like(`%${keyword}%`) },
      ],
      take: 20,
      order: { createdAt: 'DESC' },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['permissions'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['permissions'],
    });
  }

  async countByDepartment(department: string): Promise<number> {
    return await this.userRepository.count({
      where: { department },
    });
  }

  async countByStatus(status: UserStatus): Promise<number> {
    return await this.userRepository.count({
      where: { status },
    });
  }
}

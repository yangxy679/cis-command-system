import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../auth/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole, UserStatus } from '../auth/entities/user.entity';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser: Partial<User> = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    fullName: 'Test User',
    department: 'Test Department',
    rank: 'Test Rank',
    role: UserRole.OFFICER,
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123',
      fullName: 'New User',
      department: 'New Department',
      rank: 'New Rank',
      role: UserRole.OFFICER,
    };

    it('should create a new user successfully', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashedpassword',
        status: UserStatus.ACTIVE,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should throw ConflictException if username exists', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if email exists', async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['permissions'],
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateUserDto: UpdateUserDto = {
      fullName: 'Updated Name',
      email: 'updated@example.com',
    };

    it('should update user successfully', async () => {
      const existingUser = { ...mockUser, email: 'old@example.com' };
      mockRepository.findOne.mockResolvedValue(existingUser);
      mockRepository.save.mockResolvedValue({ ...existingUser, ...updateUserDto });

      const result = await service.update(1, updateUserDto);

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result.fullName).toBe('Updated Name');
      expect(result.email).toBe('updated@example.com');
    });

    it('should encrypt password if provided', async () => {
      const updateWithPassword: UpdateUserDto = {
        password: 'newpassword',
      };
      (bcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.save.mockResolvedValue({
        ...mockUser,
        password: 'newhashedpassword',
      });

      await service.update(1, updateWithPassword);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
    });
  });

  describe('remove', () => {
    it('should remove user successfully', async () => {
      const userToRemove = { ...mockUser, role: UserRole.OFFICER };
      mockRepository.findOne.mockResolvedValue(userToRemove);
      mockRepository.remove.mockResolvedValue(userToRemove);

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.remove).toHaveBeenCalledWith(userToRemove);
    });

    it('should throw BadRequestException when trying to remove admin', async () => {
      const adminUser = { ...mockUser, role: UserRole.ADMIN };
      mockRepository.findOne.mockResolvedValue(adminUser);

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('activate', () => {
    it('should activate user', async () => {
      const inactiveUser = { ...mockUser, status: UserStatus.INACTIVE };
      mockRepository.findOne.mockResolvedValue(inactiveUser);
      mockRepository.save.mockResolvedValue({
        ...inactiveUser,
        status: UserStatus.ACTIVE,
      });

      const result = await service.activate(1);

      expect(result.status).toBe(UserStatus.ACTIVE);
    });
  });

  describe('deactivate', () => {
    it('should deactivate user', async () => {
      const activeUser = { ...mockUser, role: UserRole.OFFICER };
      mockRepository.findOne.mockResolvedValue(activeUser);
      mockRepository.save.mockResolvedValue({
        ...activeUser,
        status: UserStatus.INACTIVE,
      });

      const result = await service.deactivate(1);

      expect(result.status).toBe(UserStatus.INACTIVE);
    });

    it('should throw BadRequestException when trying to deactivate admin', async () => {
      const adminUser = { ...mockUser, role: UserRole.ADMIN };
      mockRepository.findOne.mockResolvedValue(adminUser);

      await expect(service.deactivate(1)).rejects.toThrow(BadRequestException);
    });
  });
});

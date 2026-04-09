"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const user_entity_2 = require("../auth/entities/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUsername = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException('用户名已存在');
        }
        const existingEmail = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException('邮箱已存在');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            status: user_entity_2.UserStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return await this.userRepository.save(user);
    }
    async findAll(options) {
        const { page, limit, department, rank, status } = options;
        const skip = (page - 1) * limit;
        const where = {};
        if (department) {
            where.department = department;
        }
        if (rank) {
            where.rank = rank;
        }
        if (status) {
            where.status = status;
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
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`用户 ID ${id} 不存在`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingEmail = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('邮箱已存在');
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        Object.assign(user, updateUserDto);
        user.updatedAt = new Date();
        return await this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user.role === user_entity_2.UserRole.ADMIN) {
            throw new common_1.BadRequestException('不能删除管理员账户');
        }
        await this.userRepository.remove(user);
    }
    async activate(id) {
        const user = await this.findOne(id);
        user.status = user_entity_2.UserStatus.ACTIVE;
        user.updatedAt = new Date();
        return await this.userRepository.save(user);
    }
    async deactivate(id) {
        const user = await this.findOne(id);
        if (user.role === user_entity_2.UserRole.ADMIN) {
            throw new common_1.BadRequestException('不能停用管理员账户');
        }
        user.status = user_entity_2.UserStatus.INACTIVE;
        user.updatedAt = new Date();
        return await this.userRepository.save(user);
    }
    async getPermissions(id) {
        const user = await this.findOne(id);
        return user.permissions?.map(p => p.name) || [];
    }
    async search(keyword) {
        return await this.userRepository.find({
            where: [
                { username: (0, typeorm_2.Like)(`%${keyword}%`) },
                { email: (0, typeorm_2.Like)(`%${keyword}%`) },
                { fullName: (0, typeorm_2.Like)(`%${keyword}%`) },
            ],
            take: 20,
            order: { createdAt: 'DESC' },
        });
    }
    async findByUsername(username) {
        return await this.userRepository.findOne({
            where: { username },
            relations: ['permissions'],
        });
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({
            where: { email },
            relations: ['permissions'],
        });
    }
    async countByDepartment(department) {
        return await this.userRepository.count({
            where: { department },
        });
    }
    async countByStatus(status) {
        return await this.userRepository.count({
            where: { status },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map
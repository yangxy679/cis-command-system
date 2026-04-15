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
exports.UsersServiceSimple = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const bcrypt = require("bcrypt");
let UsersServiceSimple = class UsersServiceSimple {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll(query) {
        const { search, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'DESC', } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.username = (0, typeorm_2.Like)(`%${search}%`);
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
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`用户 ${id} 不存在`);
        }
        return user;
    }
    async create(createUserDto) {
        const { username, password, email, fullName } = createUserDto;
        const existingUser = await this.usersRepository.findOne({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('用户名已存在');
        }
        if (email) {
            const existingEmail = await this.usersRepository.findOne({
                where: { email },
            });
            if (existingEmail) {
                throw new common_1.BadRequestException('邮箱已存在');
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
            email,
            fullName,
        });
        return this.usersRepository.save(user);
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.email !== undefined) {
            if (updateUserDto.email !== user.email) {
                const existingEmail = await this.usersRepository.findOne({
                    where: { email: updateUserDto.email },
                });
                if (existingEmail && existingEmail.id !== id) {
                    throw new common_1.BadRequestException('邮箱已被其他用户使用');
                }
            }
            user.email = updateUserDto.email;
        }
        if (updateUserDto.fullName !== undefined)
            user.fullName = updateUserDto.fullName;
        return this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.usersRepository.remove(user);
    }
    async getStatistics() {
        const totalUsers = await this.usersRepository.count();
        return {
            total: totalUsers,
            active: totalUsers,
            verified: 0,
            inactive: 0,
            departmentStats: [],
            recentRegistrations: 0,
        };
    }
};
exports.UsersServiceSimple = UsersServiceSimple;
exports.UsersServiceSimple = UsersServiceSimple = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersServiceSimple);
//# sourceMappingURL=users.service.simple.js.map
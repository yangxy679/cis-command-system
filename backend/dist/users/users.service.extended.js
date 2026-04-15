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
exports.UsersServiceExtended = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const role_entity_1 = require("../auth/entities/role.entity");
const bcrypt = require("bcrypt");
let UsersServiceExtended = class UsersServiceExtended {
    constructor(usersRepository, rolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }
    async findAll(query) {
        const { search, department, isActive, roleId, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'DESC', } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.username = (0, typeorm_2.Like)(`%${search}%`);
        }
        if (department) {
            where.department = department;
        }
        if (isActive !== undefined) {
            where.isActive = isActive;
        }
        if (roleId) {
            where.roles = { id: roleId };
        }
        const [users, total] = await this.usersRepository.findAndCount({
            where,
            relations: ['roles'],
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
            relations: ['roles'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`用户 ${id} 不存在`);
        }
        return user;
    }
    async findByUsername(username) {
        return this.usersRepository.findOne({
            where: { username },
            relations: ['roles'],
        });
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
            isActive: true,
            isVerified: false,
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
        if (updateUserDto.rank !== undefined)
            user.rank = updateUserDto.rank;
        if (updateUserDto.department !== undefined)
            user.department = updateUserDto.department;
        if (updateUserDto.position !== undefined)
            user.position = updateUserDto.position;
        if (updateUserDto.phone !== undefined)
            user.phone = updateUserDto.phone;
        if (updateUserDto.isActive !== undefined)
            user.isActive = updateUserDto.isActive;
        if (updateUserDto.preferences !== undefined)
            user.preferences = updateUserDto.preferences;
        if (updateUserDto.roleIds !== undefined) {
            const roles = await this.rolesRepository.find({
                where: { id: (0, typeorm_2.In)(updateUserDto.roleIds) },
            });
            user.roles = roles;
        }
        return this.usersRepository.save(user);
    }
    async updateProfile(id, updateProfileDto) {
        const user = await this.findOne(id);
        if (updateProfileDto.email !== undefined) {
            if (updateProfileDto.email !== user.email) {
                const existingEmail = await this.usersRepository.findOne({
                    where: { email: updateProfileDto.email },
                });
                if (existingEmail && existingEmail.id !== id) {
                    throw new common_1.BadRequestException('邮箱已被其他用户使用');
                }
            }
            user.email = updateProfileDto.email;
        }
        if (updateProfileDto.fullName !== undefined)
            user.fullName = updateProfileDto.fullName;
        if (updateProfileDto.phone !== undefined)
            user.phone = updateProfileDto.phone;
        if (updateProfileDto.preferences !== undefined)
            user.preferences = updateProfileDto.preferences;
        return this.usersRepository.save(user);
    }
    async changeStatus(id, changeStatusDto) {
        const user = await this.findOne(id);
        user.isActive = changeStatusDto.isActive;
        if (user.preferences) {
            user.preferences.statusChangeLog = user.preferences.statusChangeLog || [];
            user.preferences.statusChangeLog.push({
                timestamp: new Date(),
                isActive: changeStatusDto.isActive,
                reason: changeStatusDto.reason,
            });
        }
        return this.usersRepository.save(user);
    }
    async assignRoles(id, assignRolesDto) {
        const user = await this.findOne(id);
        const roles = await this.rolesRepository.find({
            where: { id: (0, typeorm_2.In)(assignRolesDto.roleIds) },
        });
        user.roles = roles;
        return this.usersRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user.isSystem) {
            throw new common_1.BadRequestException('系统用户不能删除');
        }
        user.isActive = false;
        await this.usersRepository.save(user);
        return { message: '用户已禁用' };
    }
    async getStatistics() {
        const totalUsers = await this.usersRepository.count();
        const activeUsers = await this.usersRepository.count({ where: { isActive: true } });
        const verifiedUsers = await this.usersRepository.count({ where: { isVerified: true } });
        const departmentStats = await this.usersRepository
            .createQueryBuilder('user')
            .select('user.department', 'department')
            .addSelect('COUNT(*)', 'count')
            .where('user.department IS NOT NULL')
            .groupBy('user.department')
            .getRawMany();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentUsers = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.createdAt >= :sevenDaysAgo', { sevenDaysAgo })
            .getCount();
        return {
            total: totalUsers,
            active: activeUsers,
            verified: verifiedUsers,
            inactive: totalUsers - activeUsers,
            departmentStats,
            recentRegistrations: recentUsers,
        };
    }
    async searchUsers(keyword, limit = 10) {
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.username LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('user.fullName LIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('user.email LIKE :keyword', { keyword: `%${keyword}%` })
            .take(limit)
            .getMany();
    }
};
exports.UsersServiceExtended = UsersServiceExtended;
exports.UsersServiceExtended = UsersServiceExtended = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersServiceExtended);
//# sourceMappingURL=users.service.extended.js.map
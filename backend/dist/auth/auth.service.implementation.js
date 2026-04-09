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
exports.AuthServiceImplementation = void 0;
const update_profile_dto_1 = require("./dto/update-profile.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let AuthServiceImplementation = class AuthServiceImplementation {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(registerUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerUserDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('邮箱已被注册');
        }
        const existingUsername = await this.userRepository.findOne({
            where: { username: registerUserDto.username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException('用户名已被使用');
        }
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        try {
            const user = this.userRepository.create({
                email: registerUserDto.email,
                username: registerUserDto.username,
                password: hashedPassword,
                status: user_entity_1.UserStatus.ACTIVE,
                fullName: registerUserDto.fullName || '',
                phone: registerUserDto.phone || '',
            });
            const savedUser = await this.userRepository.save(user);
            const { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        }
        catch (error) {
            throw new common_1.BadRequestException('注册失败: ' + error.message);
        }
    }
    async login(loginUserDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: loginUserDto.email },
                select: ['id', 'email', 'username', 'password', 'role', 'status', 'fullName'],
            });
            if (!user) {
                throw new common_1.UnauthorizedException('用户不存在');
            }
            const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('密码错误');
            }
            if (user.status !== user_entity_1.UserStatus.ACTIVE) {
                throw new common_1.UnauthorizedException('账户已被禁用');
            }
            const tokens = await this.generateTokens(user);
            await this.userRepository.update(user.id, {
                lastLoginAt: new Date(),
            });
            const { password, ...userWithoutPassword } = user;
            return {
                user: userWithoutPassword,
                tokens,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('登录失败: ' + error.message);
        }
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'cis-secret-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        });
        const refreshToken = this.jwtService.sign({ sub: user.id }, {
            secret: process.env.JWT_REFRESH_SECRET || 'cis-refresh-secret-key',
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        });
        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: 3600,
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || 'cis-refresh-secret-key',
            });
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('用户不存在');
            }
            const newPayload = {
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
                refreshToken,
                tokenType: 'Bearer',
                expiresIn: 3600,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('刷新令牌无效');
        }
    }
    async validateUser(payload) {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('用户不存在');
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async logout(userId) {
        console.log(`用户 ${userId} 已登出`);
    }
};
exports.AuthServiceImplementation = AuthServiceImplementation;
exports.AuthServiceImplementation = AuthServiceImplementation = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthServiceImplementation);
async;
getProfile(userId, string);
Promise < any > {
    const: user = await this.userRepository.findOne({
        where: { id: userId },
    }),
    if(, user) {
        throw new common_1.UnauthorizedException('用户不存在');
    },
    const: { password, ...userWithoutPassword } = user,
    return: userWithoutPassword
};
async;
updateProfile(userId, string, updateProfileDto, update_profile_dto_1.UpdateProfileDto);
Promise < any > {
    await, this: .userRepository.update(userId, updateProfileDto),
    const: updatedUser = await this.userRepository.findOne({
        where: { id: userId },
    }),
    if(, updatedUser) {
        throw new common_1.UnauthorizedException('用户不存在');
    },
    const: { password, ...userWithoutPassword } = updatedUser,
    return: userWithoutPassword
};
async;
changePassword(userId, string, changePasswordDto, change_password_dto_1.ChangePasswordDto);
Promise < any > {
    const: user = await this.userRepository.findOne({
        where: { id: userId },
        select: ['id', 'password'],
    }),
    if(, user) {
        throw new common_1.UnauthorizedException('用户不存在');
    },
    const: isOldPasswordValid = await bcrypt.compare(changePasswordDto.oldPassword, user.password),
    if(, isOldPasswordValid) {
        throw new common_1.UnauthorizedException('旧密码错误');
    },
    if(changePasswordDto) { }, : .newPassword !== changePasswordDto.confirmNewPassword
};
{
    throw new common_1.BadRequestException('新密码和确认密码不一致');
}
const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
await this.userRepository.update(userId, {
    password: hashedNewPassword,
});
return { message: '密码修改成功' };
async;
findById(userId, string);
Promise < any > {
    const: user = await this.userRepository.findOne({
        where: { id: userId },
    }),
    if(, user) {
        throw new common_1.UnauthorizedException('用户不存在');
    },
    const: { password, ...userWithoutPassword } = user,
    return: userWithoutPassword
};
//# sourceMappingURL=auth.service.implementation.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExtended = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const role_entity_1 = require("./role.entity");
let UserExtended = class UserExtended {
    get displayName() {
        return this.fullName || this.username;
    }
    get roleNames() {
        return this.roles?.map(role => role.name) || [];
    }
    hasRole(roleName) {
        return this.roles?.some(role => role.name === roleName) || false;
    }
    hasPermission(permission) {
        return this.roles?.some(role => role.permissions?.some(p => p === permission)) || false;
    }
};
exports.UserExtended = UserExtended;
__decorate([
    (0, typeorm_1.Column)({ primary: true, generated: 'uuid' }),
    __metadata("design:type", String)
], UserExtended.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserExtended.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserExtended.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserExtended.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserExtended.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserExtended.prototype, "lastLoginIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserExtended.prototype, "loginCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], UserExtended.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, { eager: true }),
    (0, typeorm_1.JoinTable)({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], UserExtended.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserExtended.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserExtended.prototype, "updatedAt", void 0);
exports.UserExtended = UserExtended = __decorate([
    (0, typeorm_1.Entity)('users')
], UserExtended);
//# sourceMappingURL=user.entity.extended.js.map
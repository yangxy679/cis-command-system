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
exports.UpdateProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '张三', description: '真实姓名', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '真实姓名必须是字符串' }),
    (0, class_validator_1.MaxLength)(50, { message: '真实姓名最多50个字符' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '13800138000', description: '手机号码', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '手机号码必须是字符串' }),
    (0, class_validator_1.Matches)(/^1[3-9]\d{9}$/, { message: '请输入有效的手机号码' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/avatar.jpg', description: '头像URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '头像URL必须是字符串' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '技术部', description: '部门', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '部门必须是字符串' }),
    (0, class_validator_1.MaxLength)(100, { message: '部门最多100个字符' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '高级工程师', description: '职位', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '职位必须是字符串' }),
    (0, class_validator_1.MaxLength)(100, { message: '职位最多100个字符' }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "position", void 0);
//# sourceMappingURL=update-profile.dto.js.map
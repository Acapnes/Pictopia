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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email: email });
    }
    async generateLoginToken(userDto) {
        return await this.jwtService.sign({
            _id: userDto._id,
            name: userDto.name,
            username: userDto.username,
            email: userDto.email,
            birthDate: userDto.birthDate,
            avatar: userDto.avatar,
            bio: userDto.bio,
            confrimed: userDto.confrimed,
        });
    }
    async validateLoginUser(validationUserDto) {
        const selectedUser = await this.findByEmail(validationUserDto.email);
        const rawPassword = validationUserDto.password.toString();
        const loginResult = bcrypt.compareSync(rawPassword, selectedUser.password.toString());
        if (loginResult) {
            return {
                access: true,
                message: 'Access verification successful',
                access_token: await this.generateLoginToken(selectedUser),
            };
        }
        else {
            return {
                access: false,
                message: 'Access verification failed',
            };
        }
    }
    async updateProfile(userDto) {
        this.userModel.findOneAndUpdate({ email: userDto.email }, { name: userDto.name });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
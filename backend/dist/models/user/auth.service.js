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
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const bcrypt = require("bcrypt");
const user_service_1 = require("./user.service");
let AuthService = class AuthService {
    constructor(userModel, userService) {
        this.userModel = userModel;
        this.userService = userService;
    }
    async createUser(userRegistrationDto) {
        const checkEmail = await this.userService.findByEmail(userRegistrationDto.email);
        if (checkEmail != null)
            return {
                access: false,
                access_token: '',
                message: 'This email already been used',
            };
        userRegistrationDto.password = await bcrypt.hashSync(userRegistrationDto.password, 10);
        this.userModel.create(userRegistrationDto);
        return {
            access: true,
            access_token: '',
            message: 'User has been registered',
        };
    }
    async validateLoginUser(userValidationDto) {
        const selectedUser = await this.userService.findByEmail(userValidationDto.email);
        const rawPassword = userValidationDto.password.toString();
        const loginResult = bcrypt.compareSync(rawPassword, selectedUser.password.toString());
        if (loginResult) {
            return {
                access: true,
                message: 'Access verification successful',
                access_token: await this.userService.generateLoginToken(selectedUser._id),
            };
        }
        else {
            return {
                access: false,
                message: 'Access verification failed',
                access_token: '',
            };
        }
    }
    async fetchUserCredentialsWithToken(_id) {
        const findUser = (await this.userService.findByMongooseId(_id));
        return {
            name: findUser.name,
            email: findUser.email,
            username: findUser.username,
            avatar: {
                data: findUser.avatar.data,
                contentType: findUser.avatar.contentType,
            },
            birthDate: findUser.birthDate,
            confrimed: findUser.confrimed,
            bio: findUser.bio,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
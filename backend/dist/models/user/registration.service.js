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
exports.RegistrationService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const bcrypt = require("bcrypt");
const user_service_1 = require("./user.service");
let RegistrationService = class RegistrationService {
    constructor(userModel, userService) {
        this.userModel = userModel;
        this.userService = userService;
    }
    async createUser(registrationUserDto) {
        const checkEmail = await this.userService.findByEmail(registrationUserDto.email);
        if (checkEmail != null)
            return {
                access: false,
                message: 'This email already been used',
            };
        registrationUserDto.password = await bcrypt.hashSync(registrationUserDto.password, 10);
        this.userModel.create(registrationUserDto);
        return {
            access: true,
            message: 'User has been registered',
        };
    }
};
RegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, user_service_1.UserService])
], RegistrationService);
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration.service.js.map
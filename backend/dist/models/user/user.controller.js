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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const registration_user_dto_1 = require("../../dto/user/registration.user.dto");
const validation_user_dto_1 = require("../../dto/user/validation.user.dto");
const registration_service_1 = require("./registration.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(usersService, registrationService) {
        this.usersService = usersService;
        this.registrationService = registrationService;
    }
    async getUsers() {
        return this.usersService.findAll();
    }
    async userRegister(registrationUserDto) {
        return this.registrationService.createUser(registrationUserDto);
    }
    async userLogin(validationUserDto) {
        return this.usersService.validateLoginUser(validationUserDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_user_dto_1.RegistrationUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validation_user_dto_1.ValidationUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, registration_service_1.RegistrationService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
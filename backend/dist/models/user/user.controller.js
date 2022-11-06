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
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const user_find_dto_1 = require("../../dto/user/user.find.dto");
const user_registration_dto_1 = require("../../dto/user/user.registration.dto");
const user_saved_update_dto_1 = require("../../dto/user/user.saved.update.dto");
const user_update_dto_1 = require("../../dto/user/user.update.dto");
const user_validation_dto_1 = require("../../dto/user/user.validation.dto");
const auth_service_1 = require("./auth.service");
const moderation_service_1 = require("./moderation.service");
const saved_pictures_service_1 = require("./saved.pictures.service");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(usersService, authService, moderationService, savedPicturesService) {
        this.usersService = usersService;
        this.authService = authService;
        this.moderationService = moderationService;
        this.savedPicturesService = savedPicturesService;
    }
    async getUsers() {
        return this.usersService.findAll();
    }
    async userRegister(userRegistrationDto) {
        return this.authService.createUser(userRegistrationDto);
    }
    async userLogin(userValidationdto) {
        return this.authService.validateLoginUser(userValidationdto);
    }
    async userFindByUsername(UserFindDto) {
        return this.usersService.findByUsername(UserFindDto.username);
    }
    async userProfileUpdate(req, userUpdateDto) {
        return this.moderationService.updateProfile(req.user._id, userUpdateDto);
    }
    async getOneUser(req) {
        return this.savedPicturesService.findUserAndPopulateSavedPics(req.user._id);
    }
    async userSavePicture(req, userSavedPictureDto) {
        return this.savedPicturesService.savePicture(req.user._id, userSavedPictureDto);
    }
    async userRemoveSavedPicture(req, userSavedPictureDto) {
        return this.savedPicturesService.removeSavedPicture(req.user._id, userSavedPictureDto);
    }
    async userChangeAvatar(avatar_file, req) {
        return this.moderationService.changeAvatar(req.user._id, avatar_file);
    }
    async userRemoveAvatar(req) {
        return this.moderationService.removeAvatar(req.user._id);
    }
    async fetchUserCredentials(req) {
        return this.authService.fetchUserCredentialsWithToken(req.user);
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
    __metadata("design:paramtypes", [user_registration_dto_1.UserRegistrationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_validation_dto_1.UserValidationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('/find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_find_dto_1.UserFindDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userFindByUsername", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/profile/update/simple'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userProfileUpdate", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/profile/saved'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/profile/saved/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_saved_update_dto_1.UserSavedPictureDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userSavePicture", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/profile/saved/remove'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_saved_update_dto_1.UserSavedPictureDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userRemoveSavedPicture", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/profile/update/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userChangeAvatar", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/profile/update/avatar/remove'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userRemoveAvatar", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('/credentials'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchUserCredentials", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        moderation_service_1.ModerationService,
        saved_pictures_service_1.SavedPicturesService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
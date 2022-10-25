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
exports.PicController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const pic_service_1 = require("./pic.service");
let PicController = class PicController {
    constructor(picsService) {
        this.picsService = picsService;
    }
    async getPics() {
        return this.picsService.findAll();
    }
    async getPicsActionless() {
        return this.picsService.findAll();
    }
    async getPrettyPicById(res, req, id) {
        const picture = await this.picsService.getPicById(id);
        res.setHeader('Content-type', picture.picture_file.contentType);
        return res.send(picture.picture_file.data.buffer);
    }
    async getPicById(id) {
        return this.picsService.getPicById(id);
    }
    async uploadImage(file, req, body) {
        return await this.picsService.createPostWithImage(req.user, file, body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPics", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPicsActionless", null);
__decorate([
    (0, common_1.Get)('/pretty/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPrettyPicById", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getPicById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "uploadImage", null);
PicController = __decorate([
    (0, common_1.Controller)('/pics'),
    __metadata("design:paramtypes", [pic_service_1.PicService])
], PicController);
exports.PicController = PicController;
//# sourceMappingURL=pic.controller.js.map
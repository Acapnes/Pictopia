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
const comment_dto_1 = require("../../dto/comment/comment.dto");
const pic_create_dto_1 = require("../../dto/pic/pic.create.dto");
const pic_service_1 = require("./pic.service");
let PicController = class PicController {
    constructor(picsService) {
        this.picsService = picsService;
    }
    async getUsers() {
        return this.picsService.findAll();
    }
    async getOnePopulatedComment(_id) {
        return this.picsService.findOneCommentAndPopulate(_id);
    }
    async userRegister(picDto) {
        return this.picsService.create(picDto);
    }
    async commentCreate(commentDto) {
        return this.picsService.createComment(commentDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/comment/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "getOnePopulatedComment", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pic_create_dto_1.PicDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)('/comment/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "commentCreate", null);
PicController = __decorate([
    (0, common_1.Controller)('/pics'),
    __metadata("design:paramtypes", [pic_service_1.PicService])
], PicController);
exports.PicController = PicController;
//# sourceMappingURL=pic.controller.js.map